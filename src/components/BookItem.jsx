import { Link } from "react-router-dom"
import toApiUrl from "../utils/toApiUrl"
import formatCurrency from "../utils/formatCurrency"
import Chip from "./Chip"

function BookItem({ book }) {
	return (
		<div className="card card-compact card-side w-[28rem] h-64 bg-base-100 shadow-[4px_6px_64px_rgba(80,100,140,.4)]">
			<figure className="w-40">
				<img className="h-full w-full object-cover" src={book.image_url && toApiUrl(book.image_url)} alt="Product" />
			</figure>
			<div className="card-body p-6 w-1/2">
				<div className="flex gap-2 overflow-hidden hover:overflow-scroll pb-4">
					{ book.genres.map(g => <Chip key={g.name}>{ g.name }</Chip>) }
				</div>
				<h2 className="card-title font-bold">{ book.title }</h2>
				<p>by { book.authors.map(a => a.name) }</p>
				<div className="card-actions justify-between items-center">
					<p className="font-bold">{ formatCurrency(book.price) }</p>
					<Link className="btn btn-sm btn-primary" to={`/book/${book.slug}`}>View</Link>
				</div>
			</div>
		</div>
	)
}

export default BookItem