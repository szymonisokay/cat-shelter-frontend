import axios from 'axios'
import { toast } from 'react-hot-toast'

import { environment } from '@/environment/environment'
import { SignInProps, SignUpProps, User } from '@/types'

const basePath = environment.baseUrl

const signIn = async (signInData: SignInProps) => {
	try {
		const endpoint = `${basePath}/api/user/login`

		const response = await axios.post<string>(endpoint, signInData, {
			withCredentials: true,
		})

		return response.data
	} catch (error: any) {
		toast.error(error.response.data)
	}
}

const signUp = async (signUpData: SignUpProps) => {
	const endpoint = `${basePath}/api/user/register`

	const response = await axios.post<string>(endpoint, signUpData, {
		withCredentials: true,
	})

	return response.data
}

const getUserSession = async () => {
	const endpoint = `${basePath}/api/user/session`

	try {
		const response = await axios.get<User | null>(endpoint, {
			withCredentials: true,
		})

		return response.data
	} catch (error) {
		console.log(error)
	}
}

const logout = async () => {
	const endpoint = `${basePath}/logout`

	const response = await axios.post(endpoint, null, { withCredentials: true })

	return response.data
}

export default {
	signIn,
	signUp,
	getUserSession,
	logout,
}
