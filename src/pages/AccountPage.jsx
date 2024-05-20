import { useAuthContext } from "../contexts/AuthContext"
import { useQuery } from '@tanstack/react-query'
import { API } from "../services";
import toApiUrl from '../utils/toApiUrl'

async function createGetProfileRequest({ queryKey }) {
	const [, userId] = queryKey
	const response = await API.getProfile(Number(userId))
	return response.data
}

function AccountPage() {

	const { getLoggedInUser } = useAuthContext();
	const getUserId = () => {
		return getLoggedInUser().id
	}

	const { data: profile, isLoading } = useQuery({
		queryKey: ['getProfile', getUserId()],
		queryFn: createGetProfileRequest,
	})

	const getFullname = () => {
		if (!profile['first_name'] && !profile['last_name'])
			return 'No name'
		
		return profile['first_name'] + ' ' + profile['last_name']
	}

	return (
		<>
			{ isLoading && <span className="loading loading-spinner loading-lg"></span> }
			{ !isLoading && <div className="flex flex-col items-center">
				<div className="avatar my-6 lg:mb-12">
					<div className="w-36 rounded-full bg-gray-800">
						{ profile['avatar_url'] 
							? <img src={toApiUrl(profile['avatar_url'])} alt="avatar"/> 
							: <h1 className="text-center text-xl mt-14">No avatar</h1>
						}
					</div> 
				</div>
				<div className="flex flex-wrap max-w-3xl">
					<div className="stat w-fit">
						<div className="stat-title">Full name</div>
						<div className="stat-value text-3xl whitespace-normal">{ getFullname() }</div>
					</div>
					<div className="stat w-fit">
						<div className="stat-title">Email</div>
						<div className="stat-value text-3xl whitespace-normal">{ profile.email }</div>
					</div>
					<div className="stat w-fit">
						<div className="stat-title">Phone number</div>
						<div className="stat-value text-3xl whitespace-normal">{ profile['phone_number'] || 'No phone number' }</div>
					</div>
					<div className="stat w-fit">
						<div className="stat-title">Address</div>
						<div className="stat-value text-3xl whitespace-normal">{ profile.address || 'No address' }</div>
					</div>
				</div>
			</div>}
		</>
	)
}

export default AccountPage