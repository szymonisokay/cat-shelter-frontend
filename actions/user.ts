'use server'

import axios from 'axios'
import { cookies } from 'next/headers'

import { environment } from '@/environment/environment'
import { SignInProps, SignUpProps, User, UserDetails } from '@/types'

const baseUrl = environment.baseUrl

export const signIn = async (signInData: SignInProps) => {
	const endpoint = `${baseUrl}/api/user/login`

	try {
		const response = await axios.post<string>(endpoint, signInData, {
			headers: {
				cookies: cookies().toString(),
			},
		})

		return response.data
	} catch (error: any) {
		console.log(error.response.data)
	}
}

export const signUp = async (signUpData: SignUpProps) => {
	const endpoint = `${baseUrl}/api/user/register`

	try {
		const resposne = await axios.post<string>(endpoint, signUpData, {
			headers: {
				Cookie: cookies().toString(),
			},
		})

		return resposne.data
	} catch (error) {
		return null
	}
}

export const logout = async () => {
	const endpoint = `${baseUrl}/logout`

	const response = await axios.post(endpoint, null, {
		headers: {
			Cookie: cookies().toString(),
		},
	})

	return response.data
}

export const getUser = async () => {
	const endpoint = `${baseUrl}/api/user/session`

	try {
		const response = await axios.get<User | null>(endpoint, {
			headers: {
				Cookie: cookies().toString(),
			},
		})

		return response.data
	} catch (error) {
		return null
	}
}

export const getUserDetails = async (userId: number) => {
	const endpoint = `${baseUrl}/api/user/details/${userId}`

	try {
		const response = await axios.get<UserDetails>(endpoint, {
			headers: {
				Cookie: cookies().toString(),
			},
		})

		return response.data
	} catch (error) {
		return null
	}
}

export const updateUserDetails = async (details: Partial<UserDetails>) => {
	const endpoint = `${baseUrl}/api/user/update-details`

	try {
		const response = await axios.patch<UserDetails>(endpoint, details, {
			headers: {
				Cookie: cookies().toString(),
			},
		})

		return response.data
	} catch (error) {
		return null
	}
}
