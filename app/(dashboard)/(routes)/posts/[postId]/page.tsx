import { redirect } from 'next/navigation'
import { getCatBreeds, getPost } from '../../../../../actions/posts'
import { getUser } from '../../../../../actions/user'
import { PostClient } from './post-client'

const PostPage = async ({ params }: { params: { postId: string } }) => {
	const user = await getUser()

	if (!user) {
		redirect('/')
	}

	const post = await getPost(params.postId)
	const breeds = await getCatBreeds()

	console.log(post)

	return <PostClient post={post} breeds={breeds} />
}

export default PostPage
