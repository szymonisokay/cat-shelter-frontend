import axios from 'axios'
import { environment } from '../environment/environment'
import { Post } from '../types'

const baseUrl = environment.baseUrl

const createPost = async (post: Post) => {
	const endpoint = `${baseUrl}/api/posts/add`

	try {
		const resposne = await axios.post(endpoint, post, {
			withCredentials: true,
		})

		return resposne.data
	} catch (error) {
		console.log(error)
	}
}

export default {
	createPost,
}
