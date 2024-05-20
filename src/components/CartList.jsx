import CartItem from "./CartItem"

function CartList({ items, onRemove }) {

	return (
		<table className="table">
			<thead>
				<tr className="text-center">
					<th>Image</th>
					<th>Title</th>
					<th>Type</th>
					<th>Price</th>
					<th>Amount</th>
					<th>Total</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{items.map((item, index) => <CartItem key={index} item={item} onRemove={() => onRemove(item.bookId, item.isPhysical)}/>)}
			</tbody>
		</table>
	)
}

export default CartList
