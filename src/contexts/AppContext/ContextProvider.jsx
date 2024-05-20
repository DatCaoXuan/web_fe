import { createContext } from "react"
import { CartProvider } from "../CartContext"
import { AuthContextProvider } from "../AuthContext"
import { SearchContextProvider } from "../SearchContext"
import { useQuery } from "@tanstack/react-query"
import { API } from "../../services"

const Context = createContext(null)

async function createGetGenreRequest() {
	const response = await API.getGenres()
	const genres = response.data
	genres.sort((a, b) => a.name.localeCompare(b.name))

	return genres
}

async function createGetAuthorsRequest() {
	const response = await API.getAuthors()
	return response.data
}

async function createGetPublishersRequest() {
	const response = await API.getPublishers()
	return response.data
}

function ContextProvider({ children }) {

	const { data: genres, isLoading: isGenresLoading } = useQuery({
		queryKey: ['getGenres'],
		queryFn: createGetGenreRequest,
	});

	const { data: authors, isLoading: isAuthorsLoading } = useQuery({
		queryKey: ['getAuthors'],
		queryFn: createGetAuthorsRequest,
	});

	const { data: publishers, isLoading: isPublishersLoading } = useQuery({
		queryKey: ['getPublishers'],
		queryFn: createGetPublishersRequest,
	});

	return (
		<Context.Provider value={{
			genres,
			authors,
			publishers,
			isGenresLoading,
			isAuthorsLoading,
			isPublishersLoading,
			isLoading: isGenresLoading || isAuthorsLoading || isPublishersLoading,
		}}>
			<CartProvider>
				<AuthContextProvider>
					<SearchContextProvider>
						{ children }
					</SearchContextProvider>
				</AuthContextProvider>
			</CartProvider>
		</Context.Provider>
	)
}

export { ContextProvider, Context }
