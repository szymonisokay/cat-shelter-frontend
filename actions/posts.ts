'use server'

import axios from 'axios'
import { cookies } from 'next/headers'

import { environment } from '@/environment/environment'
import { Post, PostWithUserDetails } from '@/types'

const baseUrl = environment.baseUrl

export const getCatBreeds = async () => {
	const endpoint = `${baseUrl}/api/cats/breeds`

	try {
		const response = await axios.get<string[]>(endpoint, {
			withCredentials: true,
		})

		return response.data
	} catch (error) {
		console.log(error)
	}
}

export const createPost = async (post: Post) => {
	const endpoint = `${baseUrl}/api/posts/add`

	try {
		const resposne = await axios.post(endpoint, post, {
			headers: {
				Cookie: cookies().toString(),
			},
		})

		return resposne.data
	} catch (error) {
		console.log(error)
	}
}

export const getPost = async (postId: string) => {
	const endpoint = `${baseUrl}/api/posts/by-post-id/${postId}`

	try {
		const response = await axios.get<PostWithUserDetails | null>(endpoint, {
			headers: {
				Cookie: cookies().toString(),
			},
		})

		return response.data
	} catch (error) {
		console.log(error)
		return null
	}
}

export const getPosts = async () => {
	try {
		const endpoint = `${baseUrl}/api/posts/all`

		const response = await axios.get<PostWithUserDetails[]>(endpoint, {
			params: {
				page: 0,
				size: 20,
			},
			headers: {
				Cookie: cookies().toString(),
			},
		})

		return response.data
	} catch (error: any) {
		console.log(error.response.data)
	}
}
