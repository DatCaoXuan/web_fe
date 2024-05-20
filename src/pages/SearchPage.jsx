/* eslint-disable eqeqeq */
import toApiUrl from '../utils/toApiUrl'
import { useSearchContext } from "../contexts/SearchContext";
import SearchForm from "../components/SearchForm";
import { Link } from 'react-router-dom';
import BookItem from '../components/BookItem';

function SearchPage() {
	
	const { books } = useSearchContext() 

	return (
		<>
			<SearchForm />
			<div className="flex flex-col gap-12 items-center">
				<div className="inline-flex flex-wrap gap-8">
					{ (books ?? []).map(book => <BookItem key={book.id} book={book}/>) }
				</div>
			</div>
		</>
	)
}

export default SearchPage