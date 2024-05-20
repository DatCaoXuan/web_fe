import ListItem from "./ListItem"

function List({ items, onEdit, onRemove }) {
  	return (
		<table className="table">
			<thead>
				<tr className="text-center">
					<th>Image</th>
					<th>Title</th>
					<th>Type</th>
					<th>Genres</th>
					<th>Price</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{(items ?? []).map((item, index) => 
					<ListItem 
						key={index} 
						item={item} 
						onEdit={() => onEdit(item.slug)} 
						onRemove={() => onRemove(item.id)}
					/>
				)}
			</tbody>
		</table>
  	)
}

export default List