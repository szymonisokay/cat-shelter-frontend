'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { User } from '@/types'
import { UserMenu } from './user-menu'

interface Props {
	user: User | null
}

export const Navbar = ({ user }: Props) => {
	const pathname = usePathname()
	const router = useRouter()

	const routes = [
		{
			href: '/',
			label: 'Home',
		},
		{
			href: '/posts',
			label: 'Posts',
		},
	]

	return (
		<div className='border-b'>
			<header className='flex items-center p-4 m-auto sm:p-5 max-w-7xl'>
				<div className='flex items-center gap-x-4'>
					<Sidebar />

					<p className='text-lg font-bold leading-none tracking-tight'>
						<Link prefetch={false} href='/'>
							LOGO
						</Link>
					</p>
				</div>

				<div className='flex items-center ml-auto gap-x-4'>
					<nav className='items-center hidden sm:flex gap-x-4'>
						{routes.map((route) => (
							<Link
								prefetch={false}
								className={cn(
									'text-sm text-muted-foreground hover:text-blue-700 duration-150',
									pathname === route.href &&
										'font-bold text-primary'
								)}
								key={route.href}
								href={route.href}
							>
								{route.label}
							</Link>
						))}
					</nav>

					{!user && (
						<Link prefetch={false} href='/sign-in'>
							<Button
								className='ml-0 duration-150 bg-blue-700 sm:ml-6 hover:bg-blue-700/90 focus:shadow-lg'
								size='sm'
							>
								Sign in
							</Button>
						</Link>
					)}

					{user && <UserMenu user={user} />}
				</div>
			</header>
		</div>
	)
}
