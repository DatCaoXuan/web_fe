import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import makeMap from "../../utils/makeMap";
import { API } from "../../services";
import { useForm } from "react-hook-form";
import { BOOK_TYPE, SEARCH_TYPE } from "../../data/constants";
import { useAppContext } from "../AppContext";

const Context = createContext(null)

const bookTypeParamsMap = makeMap([
	['both', BOOK_TYPE.BOTH],
	['physical', BOOK_TYPE.PHYSICAL],
	['ebook', BOOK_TYPE.E_BOOK],
])
const searchTypeParamsMap = makeMap([
	['name', SEARCH_TYPE.NAME],
	['author', SEARCH_TYPE.AUTHOR],
])

async function createGetBooksRequest({ queryKey }) {
	const [, queryParams] = queryKey
	const response = await API.getBooks(queryParams)
	return response.data
}

function ContextProvider({ children }) {

	const [params, setParams] = useSearchParams()

	const { genres } = useAppContext()
	const genreParamsMap = useMemo(() => makeMap(genres?.map(genre => [genre.name, genre]) ?? []), [genres])

	const processParams = () => {

		const keyword = params.get('search') ?? ''
		const searchType = params.get('search_type') ?? 'name'
		const bookType = params.get('book_type')
		const genreParams = params.get('genres')?.split(',')
		const genreIDs = genreParams?.map(p => genreParamsMap.get(p)?.id)
		return {
			...(searchType === 'author' && { author: keyword }),
			...(searchType === 'name' && { search: keyword }),
			book_type: bookTypeParamsMap.get(bookType),
			...(genreIDs && { genres: genreIDs.join(',') }),
		}
	}

	const { data: books, refetch } = useQuery({
		queryKey: ['getBooks', processParams()],
		queryFn: createGetBooksRequest,	
	})

	const { 
		register, 
		handleSubmit, 
		control,
		reset,
		getValues
	} = useForm({
		defaultValues: {
			search_type: SEARCH_TYPE.NAME,
		}
	});

	useEffect(() => {
		reset({
			...getValues(),
			search: params.get('search'),
			search_type: searchTypeParamsMap.get(params.get('search_type') ?? 'name'),
			book_type: bookTypeParamsMap.get(params.get('book_type')),
		})
	}, [params])

	useEffect(() => {
		if (genres == null)
			return

		const genreParams = params.get('genres')?.split(',')

		reset({
			...getValues(),
			genres: genreParams?.map(p => genreParamsMap.get(p)),
		})
	}, [genres, params])

	const processSearchData = (data) => {
		const genreNames = data.genres?.map(p => p.name)
		setParams({
			search: data.search ?? '',
			...(data.search_type != null && {search_type: searchTypeParamsMap.getByValue(data.search_type)}),
			...(data.book_type != null && { book_type: bookTypeParamsMap.getByValue(data.book_type) }),
			...(genreNames != null && data.genres.length > 0 && { genres: genreNames.join(',') })
		})
	}

	return (
		<Context.Provider value={{
			handleSubmit: handleSubmit(processSearchData),
			control,
			books,
			register,
			refresh: refetch
		}}>
			{ children }
		</Context.Provider>
	)
}

export { ContextProvider, Context }