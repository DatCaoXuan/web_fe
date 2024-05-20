import { useMemo } from "react"
import { BOOK_TYPE, SEARCH_TYPE } from "../data/constants"
import makeMap from "../utils/makeMap"
import { useSearchContext } from "../contexts/SearchContext"
import Select from "./Select"
import { useAppContext } from "../contexts/AppContext"

const bookTypeLabelMap = makeMap([
	[BOOK_TYPE.BOTH, 'Both'],
	[BOOK_TYPE.PHYSICAL, 'Physical'],
	[BOOK_TYPE.E_BOOK, 'E-book'],
])
const searchTypeLabelMap = makeMap([
	[SEARCH_TYPE.NAME, 'By name'],
	[SEARCH_TYPE.AUTHOR, 'By author'],
])

function SearchForm({ onSubmit }) {
	const { genres } = useAppContext()
	const { handleSubmit, control, register } = useSearchContext()

	const genreLabelMap = useMemo(() => {
		if (!genres)
			return new Map()
		else
			return makeMap(genres.map(genre => [genre, genre.name]))
	}, [genres])

	return (
		<>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-12">
				<div className="join">
					<Select 
						className="join-item"
						labelMap={searchTypeLabelMap}
						name='search_type'
						control={control}
					/>
					<input type="text" placeholder="" className="input input-bordered w-full max-w-xs join-item focus:outline-none" { ...register('search') } />
					<button type="submit" className="btn btn-primary join-item">Search</button>
				</div>
				<div className="flex flex-wrap gap-4">
					<Select 
						className="min-w-[10rem]"
						title="Genres"
						labelMap={genreLabelMap}
						isMulti isClearable
						name='genres'
						control={control}
					/>
					<Select 
						className="min-w-[10rem]"
						title="Book type"
						labelMap={bookTypeLabelMap}
						isClearable
						name='book_type'
						control={control}
					/>
				</div>
			</form>
		</>
	)
}

export default SearchForm
