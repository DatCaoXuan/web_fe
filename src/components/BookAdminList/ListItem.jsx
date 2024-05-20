import { BOOK_TYPE } from "../../data/constants"
import formatCurrency from "../../utils/formatCurrency"
import makeMap from "../../utils/makeMap"
import toApiUrl from "../../utils/toApiUrl"
import Chip from "../Chip"

const bookTypeLabelMap = makeMap([
	[BOOK_TYPE.BOTH, 'Both'],
	[BOOK_TYPE.PHYSICAL, 'Physical'],
	[BOOK_TYPE.E_BOOK, 'E-book'],
])

function ListItem({ item, onEdit, onRemove }) {

	return (
		<tr>
			<td className="text-center">
				<div className="avatar">
					<div className="mask mask-squircle w-12 h-12">
						<img
							src={ item?.image_url && toApiUrl(item.image_url) }
							alt="thumbnail"
						/>
					</div>
				</div>
			</td>
			<td>
				<div className="font-bold">{ item.title }</div>
				<div className="text-sm opacity-50">by { item.authors.map((a) => a.name).join(', ') }</div>
			</td>
			<td>
				<div className="flex justify-center">
					<Chip className="w-fit">{ bookTypeLabelMap.get(item.book_type) }</Chip>
				</div>
			</td>
			<td>
				<div className="flex flex-wrap gap-2">
					{ item.genres.map(g => <Chip key={g.name}>{ g.name }</Chip>) }
				</div>
			</td>
			<td className="text-center">{ formatCurrency(item.price) }</td>
			<td className="text-center">
				<details className="dropdown dropdown-left">
					<summary className="m-1 btn">Actions</summary>
					<div className="dropdown-content join join-vertical z-10 shadow-[1px_2px_32px_rgba(0,0,0,.3)] rounded-md">
						<button className="btn btn- p-2 w-full btn-sm btn-secondary join-item" onClick={onEdit}>Edit</button>
						<button className="btn btn-error p-2 w-full btn-sm join-item" onClick={onRemove}>Remove</button>
					</div>
				</details>
			</td>
		</tr>
	)
}

export default ListItem