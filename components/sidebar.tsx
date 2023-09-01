'use client'

import { CatIcon, LayoutDashboardIcon, MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export const Sidebar = () => {
	const pathname = usePathname()
	const router = useRouter()

	const [open, setOpen] = useState<boolean>(false)

	const routes = [
		{
			href: '/',
			label: 'Home',
			icon: LayoutDashboardIcon,
		},
		{
			href: '/posts',
			label: 'Posts',
			icon: CatIcon,
		},
	]

	const onCreatePost = () => {
		router.push('/posts/new')
		setOpen(false)
	}

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					onClick={() => setOpen(true)}
					className='sm:hidden'
					variant='ghost'
					size='icon'
				>
					<MenuIcon className='w-5 h-5' />
				</Button>
			</SheetTrigger>
			<SheetContent side='left'>
				<div className='flex flex-col h-full'>
					<SheetHeader>
						<Link
							href='/'
							onClick={() => setOpen(false)}
							className='text-lg font-bold text-left'
						>
							Logo
						</Link>
					</SheetHeader>
					<div className='flex flex-col mt-10 gap-y-2'>
						{routes.map(({ href, label, icon: Icon }) => (
							<Link
								onClick={() => setOpen(false)}
								prefetch={false}
								key={href}
								href={href}
								className={cn(
									'px-4 py-2 hover:bg-blue-300/10 rounded-md duration-200 flex gap-x-2 items-center text-muted-foreground hover:text-primary',
									pathname === href &&
										'bg-blue-300/10 text-primary'
								)}
							>
								<Icon className='w-4 h-4' />
								{label}
							</Link>
						))}
					</div>

					<Button
						className='w-full mt-auto duration-200 bg-blue-700 hover:bg-blue-700/90'
						onClick={onCreatePost}
					>
						Create post
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	)
}
