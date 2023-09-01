'use client'

import {
	CatIcon,
	LogOutIcon,
	MessageCircleIcon,
	MessagesSquareIcon,
	UserIcon,
} from 'lucide-react'

import { logout } from '@/actions/user'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User } from '@/types'
import { useRouter } from 'next/navigation'

type Props = {
	user: User
}

export const UserMenu = ({ user }: Props) => {
	const router = useRouter()

	const onLogout = async () => {
		await logout()

		router.push('/sign-in')
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className=''>
					<AvatarFallback>
						{user.username.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='mr-2'>
				<DropdownMenuLabel>My account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='gap-x-3'>
					<UserIcon className='w-4 h-4' />
					<div className='flex flex-col'>
						<span className='text-sm'>{user.username}</span>
						<span className='text-xs text-muted-foreground'>
							{user.email}
						</span>
					</div>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='gap-x-3'>
					<CatIcon className='w-4 h-4' />
					<span>My posts</span>
				</DropdownMenuItem>
				<DropdownMenuItem className='gap-x-3'>
					<MessageCircleIcon className='w-4 h-4' />
					<span>My comments</span>
				</DropdownMenuItem>
				<DropdownMenuItem className='gap-x-3'>
					<MessagesSquareIcon className='w-4 h-4' />
					<span>My messages</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={onLogout} className='gap-x-3'>
					<LogOutIcon className='w-4 h-4' />
					<span>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
