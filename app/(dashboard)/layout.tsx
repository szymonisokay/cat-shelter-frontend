import { getUser } from '@/actions/user'
import { Navbar } from '@/components/navbar'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
	const user = await getUser()

	return (
		<div>
			<Navbar user={user} />
			<main className='p-4 m-auto max-w-7xl'>{children}</main>
		</div>
	)
}

export default MainLayout
