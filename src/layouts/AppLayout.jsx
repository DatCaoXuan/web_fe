import { Navigate, Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useAuthContext } from '../contexts/AuthContext'

function AppLayout() {

	const { isLoggedIn } = useAuthContext();
	const location = useLocation();

	if (location.pathname.includes('/login') && isLoggedIn()) {
		return <Navigate to='.' replace/>
	}

	return (
		<>
			<Navbar className="navbar bg-base-100 shadow-lg fixed z-10"/>
			<div className="p-8 pt-24">
				<Outlet />
			</div>
		</>
	)
}

export default AppLayout