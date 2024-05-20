import { useCart } from "../contexts/CartContext"
import formatCurrency from "../utils/formatCurrency"
import toApiUrl from "../utils/toApiUrl"
import Chip from "./Chip"

function CartItem({ item, onRemove }) {

	const { setAmount } = useCart()

	return (
		<tr>
			<td>
				<div className="avatar">
					<div className="mask mask-squircle w-12 h-12">
						<img
							src={ toApiUrl(item.image_url) }
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
					<Chip className="w-fit">
						{ item.isPhysical ? 'Physical' : 'E-Book' }
					</Chip>
				</div>
			</td>
			<td>{ formatCurrency(item.price) }</td>
			<td className="text-center">{ item.isPhysical ? (<>
				<input 
					type="number"
					min={1} 
					className="input input-bordered w-full max-w-xs" 
					value={item.amount}  
					onChange={e => setAmount(item.bookId, item.isPhysical, +e.target.value)}
				/>
			</>) : item.amount }</td>
			<td>{ formatCurrency(item.price * item.amount) }</td>
			<td>
				<button 
					className="btn btn-error join-item"
					onClick={onRemove}
				>Remove</button>
			</td>
		</tr>
	)
}

export default CartItem
