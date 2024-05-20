import { useMutation } from "@tanstack/react-query";
import { createContext } from "react";
import { API } from "../../services";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Toast";
import { TOKEN_KEY, USER_KEY } from '../../data/constants.js'
import { useCart } from "../CartContext/index.js";

const Context = createContext(null)

function createRegisterRequest(data) {
	return API.register({
		username: data.username,
		password: data.password,
		profile: {
			first_name: data.profile.firstName,
			last_name: data.profile.lastName,
			email: data.profile.email,
			phone_number: data.profile.phoneNumber,
			address: data.profile.address,
		},
	})
}

function ContextProvider({ children }) {

	const navigate = useNavigate()
	const cart = useCart()
	const saveToken = (token, user, remember) => {
		if (remember) {
			localStorage.setItem(TOKEN_KEY, token)
			localStorage.setItem(USER_KEY, JSON.stringify(user))
		} else {
			sessionStorage.setItem(TOKEN_KEY, token)
			sessionStorage.setItem(USER_KEY, JSON.stringify(user))
		}
	}
	const { show: showToast } = useToast()

	const { mutate: login, isPending: isLoggingIn } = useMutation({
		mutationFn: ({ username, password, rememberMe }) => API.login(username, password, rememberMe),
		onSuccess: ({ data, remember }) => {
			saveToken(data.access, { id: data['user-id'], role: data.user_role }, remember)
			navigate('.', { replace: true })
		}
	})
	const { mutate: register, isPending: isRegisterPending } = useMutation({
		mutationFn: createRegisterRequest,
		onSuccess: ({ data }) => {
			showToast(`Successfully created user '${ data.username }'`, 'success')
			navigate('/login')
		}
	})

	const isLoggedIn = () => {
		const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY)
		return token != null
	}

	const getLoggedInUser = () => {
		const userData = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY)
		return userData && JSON.parse(userData)
	}

	const logout = () => {
		localStorage.removeItem(TOKEN_KEY)
		sessionStorage.removeItem(TOKEN_KEY)
		localStorage.removeItem(USER_KEY)
		sessionStorage.removeItem(USER_KEY)
		cart.removeAll()
	}

	return (
		<Context.Provider value={{
			login,
			isLoggingIn,
			logout,
			isLoggedIn,
			register,
			isRegisterPending,
			getLoggedInUser,
		}}>{ children }</Context.Provider>
	)
}

export { ContextProvider, Context }
