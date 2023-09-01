import { getUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import { Client } from './client'

const ConfirmAccountPage = async () => {
	const user = await getUser()

	if (!user) {
		redirect('/')
	}

	return <Client user={user} />
}

export default ConfirmAccountPage
