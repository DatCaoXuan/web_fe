import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { NavLink } from "react-router-dom/dist";
import {useAuthContext } from '../contexts/AuthContext'

function LoginPage() {

	const context = useAuthContext()
	const validationSchema = yup.object().shape({
		username: yup.string().required('Username is required'),
		password: yup.string().required('Password is required'),
	})
	const { 
		register, 
		handleSubmit, 
		formState: { errors },
	} = useForm({ 
		resolver: yupResolver(validationSchema),
		mode: 'onTouched'
	});
	
	return (
		<>
			<h1>LoginPage</h1>
			<form onSubmit={handleSubmit(context.login)}>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Username</span>
					</label>
					<input 
						type="text" 
						placeholder="Enter your username..."
						{ ...register('username') } 
						className="input input-bordered w-full max-w-xs" />
					<label className="label">
						<span className="label-text-alt">{ errors.username?.message }</span>
					</label>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Password</span>
					</label>
					<input 
						type="password" 
						placeholder="Enter your password..."
						{ ...register('password') } 
						className="input input-bordered w-full max-w-xs" />
					<label className="label">
						<span className="label-text-alt">{ errors.password?.message }</span>
					</label>
				</div>
				<NavLink className="link" to="/register">Don't have an account? Create one here</NavLink>
				<div className="form-control">
					<label className="label cursor-pointer">
						<input type="checkbox" className="checkbox" { ...register('rememberMe') }/>
						<span className="label-text">Remember me</span>
					</label>
				</div>
				<button type="submit" className="btn btn-primary">
					{ context.isLoggingIn ? 'Logging in...' : 'Login' }
				</button>
			</form>
		</>
	)
}

export default LoginPage