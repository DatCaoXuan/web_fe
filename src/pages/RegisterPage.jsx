import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import 'yup-phone-lite'

import { useAuthContext } from "../contexts/AuthContext"
import TextInput from "../components/TextInput"

function RegisterPage() {

	const { register: signup, isRegisterPending } = useAuthContext()
	const validationSchema = yup.object().shape({
		username: yup.string().required('Username is required'),
		password: yup.string().required('Password is required'),
		profile: yup.object({
			email: yup.string().required('Email is required').email('Invalid email'),
			phoneNumber: yup.string().phone('VN', 'Invalid phone number'),
		}),
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
			<div>RegisterPage</div>
			<form onSubmit={handleSubmit(signup)}>
				<TextInput 
					label="Username" 
					placeholder="Enter your username..." 
					errorMessage={errors.username?.message} 
					{ ...register('username') }
					isRequired
				/>
				<TextInput 
					type="password" 
					label="Password" 
					placeholder="Enter your password..." 
					errorMessage={errors.password?.message} 
					{ ...register('password') }
					isRequired
				/>
				<TextInput 
					type="email" 
					label="Email" 
					placeholder="Enter your email..." 
					errorMessage={errors.profile?.email?.message} 
					{ ...register('profile.email') }
					isRequired
				/>
				<div className="flex">
					<TextInput 
						label="First name" 
						placeholder="Enter your first name..." 
						errorMessage={errors.profile?.firstName?.message} 
						{ ...register('profile.firstName') }
					/>
					<TextInput 
						label="Last name" 
						placeholder="Enter your last name..." 
						errorMessage={errors.profile?.lastName?.message} 
						{ ...register('profile.lastName') }
					/>
				</div>
				<TextInput 
					label="Phone number"
					type="tel"
					placeholder="Enter your phone number..."
					errorMessage={errors.profile?.phoneNumber?.message}
					{ ...register('profile.phoneNumber') }
				/>
				<TextInput 
					label="Address"
					placeholder="Enter your address..."
					errorMessage={errors.profile?.address?.message}
					{ ...register('profile.address') }
				/>
				<button type="submit" className="btn btn-primary">
					{ isRegisterPending ? 'Creating...' : 'Create new account' }
				</button>
			</form>
		</>
	)
}

export default RegisterPage