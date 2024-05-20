import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router"
import { API } from "../services";
import toApiUrl from "../utils/toApiUrl";
import formatCurrency from '../utils/formatCurrency'
import AddToCartForm from "../components/AddToCartForm";
import Chip from '../components/Chip'

async function createGetBookRequest({ queryKey }) {
	const [, slug] = queryKey
	const response = await API.getBook(slug)
	return response.data
}

function DetailsPage() {

	const { slug } = useParams();
	const { data: book, isLoading } = useQuery({
		queryKey: ['getBook', slug],
		queryFn: createGetBookRequest
	})

	return (
		<div className="py-4 lg:px-16 px-8 flex flex-col items-center">
			{ isLoading && <span className="loading loading-spinner loading-lg"></span> }
			{ book != null && <>
				<section className="w-full flex gap-12 max-w-8xl max-h-lg items-center m-auto mb-12 justify-center">
					<div className="max-w-sm h-full rounded-md bg-zinc-800">
						<img className="rounded" src={book.image_url && toApiUrl(book.image_url)} alt="thumbnail"/>
					</div>
					<div className="flex flex-col gap-3 flex-grow">
						<div className="mb-3">
							<div className="mb-3">
								<h2 className="text-3xl font-bold font-serif">{ book.title }</h2>
								<p>by { book.authors.map(a => a.name).join(', ') }</p>
							</div>
							<div className="flex gap-2">
								{ book.genres.map(g => <Chip key={g.name}>{ g.name }</Chip>) }
							</div>
						</div>
						<hr className="mb-3"/>
						<div className="mb-6">
							<p className="text-sm">Price:</p>
							<h2 className="text-2xl font-bold">{ formatCurrency(book.price) }</h2>
						</div>
						<AddToCartForm book={book}/>
					</div>
				</section>
				<section className="w-full mb-12">
					<h2 className="text-3xl font-serif font-bold mb-4">Descriptions</h2>
					<p>{ book.description || 'No descriptions' }</p>
				</section>
				<section className="w-full">
					<h2 className="text-3xl font-serif font-bold mb-4">Product details</h2>
					<div className="w-full">
						<table className="m-auto w-96">
							<tbody className="border-collapse">
								<tr>
									<th className="text-left">Publisher:</th>
									<td className="p-2">{ book.publisher.name }</td>
								</tr>
								<tr>
									<th className="text-left">Publication date:</th>
									<td className="p-2">{ book.published_date }</td>
								</tr>
								<tr>
									<th className="text-left">Pages:</th>
									<td className="p-2">{ book.pageCount }</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
			</>}
		</div>
	)
}

export default DetailsPage