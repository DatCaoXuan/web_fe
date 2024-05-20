import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../contexts/AuthContext";
import { API } from "../services";
import { useCart } from "../contexts/CartContext";
import * as yup from 'yup'
import 'yup-phone-lite'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import classNames from "classnames";
import TextInput from "../components/TextInput";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/Toast";
import manip from "../utils/propertyManip";

async function createGetProfileRequest({ queryKey }) {
	const [, userId] = queryKey
	const response = await API.getProfile(Number(userId))
	return response.data
}

async function createCheckoutRequest(data) {
	const response = await API.checkout(manip(data)
		.map('items', item => manip(item)
			.replace('bookId', 'book')
			.replace('isPhysical', 'is_physical')
			.finish()
		)
		.replace('creditCard', 'credit_card')
		.replace('phoneNumber', 'phone_number')
		.finish()
	)
	return response.data
}

function CheckoutFormPage() {
	const { getLoggedInUser } = useAuthContext();
	const getUserId = () => {
		return getLoggedInUser().id
	}

	const { isDetailsPending, itemDetails, ...cart } = useCart();

	const { data: profile, isLoading } = useQuery({
		queryKey: ['getProfile', getUserId()],
		queryFn: createGetProfileRequest,
	})

	const validationSchema = yup.object().shape({
		name: yup.string().required('Name is required'),
		address: yup.string().required('Address is required'),
		email: yup.string().required('Email is required').email('Invalid email'),
		phoneNumber: yup.string()
			.required('Phone number is required')
			.phone('VN', 'Invalid phone number'),
		creditCard: yup.string()
			.required('Credit card number is required')
			.matches(/^\d+$/, 'Invalid credit card number')
			.max(16, 'Invalid credit card number'),
	})

	const { 
		register, 
		handleSubmit, 
		reset,
		formState: { errors, isValid },
	} = useForm({ 
		resolver: yupResolver(validationSchema),
		mode: 'onTouched'
	});

	useEffect(() => {
		if (profile == null)
			return

		reset(manip()
			.optional('name', `${profile.first_name} ${profile.last_name}`, profile.first_name && profile.last_name)
			.optional('address', profile.address)
			.optional('email', profile.email)
			.optional('phoneNumber', profile.phone_number)
			.finish()
		)
	}, [profile])

	const navigate = useNavigate()
	const { show: showToast } = useToast()
	const { mutate: checkout, isPending: isPendingCheckout } = useMutation({
		mutationFn: createCheckoutRequest,
		onSuccess: () => {
			showToast(`Successfully ordered ${ cart.items.length } item(s)`, 'success')
			cart.removeAll()
			navigate('/search')
		},
		onError: err => {
			console.log(err)
			showToast('Failed to create order', 'error')
			navigate('/cart')
		}
	})

	const processFormData = (data) => {
		checkout({
			user: getUserId(),
			...data,
			items: cart.items,
		})
	}

	return (
		<>
			{ isLoading && <span className="loading loading-spinner loading-lg"></span> }
			<form onSubmit={handleSubmit(processFormData)}>
				<TextInput 
					label="Name"
					placeholder="Enter your name..."
					errorMessage={errors.name?.message}
					isRequired
					{ ...register('name') }
				/>
				<TextInput 
					label="Address"
					placeholder="Enter your address..."
					errorMessage={errors.address?.message}
					isRequired
					{ ...register('address') }
				/>
				<TextInput 
					type="email" 
					label="Email" 
					placeholder="Enter your email..." 
					errorMessage={errors.email?.message} 
					isRequired
					{ ...register('email') }
				/>
				<TextInput 
					label="Phone number"
					type="tel"
					placeholder="Enter your phone number..."
					errorMessage={errors.phoneNumber?.message}
					isRequired
					{ ...register('phoneNumber') }
				/>
				<TextInput 
					label="Credit card number"
					placeholder="Enter your credit card number..."
					errorMessage={errors.creditCard?.message}
					isRequired
					{ ...register('creditCard') }
				/>
				<button 
					className={classNames("btn btn-primary", {
						'btn-disabled': !isValid,
					})} 
					disabled={!isValid}
				>
					{ isPendingCheckout ? 'Creating order...' : 'Confirm checkout' }
				</button>
			</form>
		</>
	)
}

export default CheckoutFormPage