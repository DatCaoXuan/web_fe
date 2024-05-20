import { NavLink } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"
import { USER_ROLE } from "../data/constants"

function Navbar({ className }) {
	const { isLoggedIn, logout, getLoggedInUser } = useAuthContext()

	const user = getLoggedInUser()

	return (
		<nav className={className}>
			<div className="flex-1">
				<NavLink className="btn btn-ghost normal-case text-xl" to=".">Bookstore</NavLink>
			</div>
			<div className="flex-none">
				{ isLoggedIn() 
					? <ul className="menu menu-horizontal px-1">
						<li><NavLink to="/search">Search</NavLink></li>
						<li><NavLink to="/cart">Cart</NavLink></li>
						<li><NavLink to="/account">Account</NavLink></li>
						{ user.role === USER_ROLE.ADMIN && <li><NavLink to="/admin">Admin</NavLink></li> }
						<li><NavLink to="/login" onClick={() => {
							logout()
						}}>Logout</NavLink></li>
					</ul> 
					: <ul className="menu menu-horizontal px-1">
						<li><NavLink to="/login">Login</NavLink></li>
						<li><NavLink to="/register">Register</NavLink></li>
					</ul> 
				}
			</div>
		</nav>
	)
}

export default Navbar