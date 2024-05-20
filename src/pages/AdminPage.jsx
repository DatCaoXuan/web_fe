import { useMutation, useQuery } from "@tanstack/react-query"
import SearchForm from "../components/SearchForm"
import { useSearchContext } from "../contexts/SearchContext"
import BookAdminList from "../components/BookAdminList"
import { API } from "../services"
import { useToast } from "../contexts/Toast"
import { Link, useNavigate } from "react-router-dom"

function AdminPage() {

	const { books, refresh } = useSearchContext() 

	const { show: showToast } = useToast()
	const { mutate: deleteBook } = useMutation({
		mutationFn: async (id) => await API.deleteBook(id),
		onSuccess: (data, id) => {
			refresh()
			showToast(`Successfully delete book with id ${id}`, 'success')
		},
		onError: err => {
			console.log(err)
			showToast('Failed to delete book', 'error')
		}
	})
	const navigate = useNavigate()
	const handleEdit = (slug) => {
		navigate(`/admin/edit/${slug}`)
	}

	return (
		<>
			<div>AdminPage</div>
			<div className="flex justify-between">
				<SearchForm />
				<Link to="add"><button className="btn btn-primary">+ New book</button></Link>
			</div>
			
			<BookAdminList items={books} onRemove={deleteBook} onEdit={handleEdit} />
		</>
	)
}

export default AdminPage