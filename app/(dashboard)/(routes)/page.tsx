import { MapPinIcon, UserIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { getPosts } from '@/actions/posts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PostWithUserDetails } from '@/types'

const DashboardPage = async () => {
	const posts = await getPosts()

	console.log(posts)
	return (
		<div>
			<h3 className='text-lg font-semibold leading-none tracking-tight'>
				All cat posts
			</h3>

			<div className='grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3'>
				{posts?.map((post: PostWithUserDetails) => (
					<Card
						key={post.name}
						className='flex flex-col p-4 shadow-none'
					>
						<div className='relative w-full h-[200px] rounded-md overflow-hidden'>
							<Image
								fill
								src={post.images[0]}
								alt={post.name}
								className='z-0 object-cover'
							/>

							<Badge
								variant='secondary'
								className='absolute z-10 top-2 right-2'
							>
								{post.breed}
							</Badge>
						</div>

						<div className='flex flex-col mt-2 gap-y-2'>
							<div className='flex items-center justify-between gap-x-4'>
								<p className='flex items-center text-sm text-muted-foreground gap-x-2'>
									<MapPinIcon className='w-4 h-4 text-blue-700' />
									<span>{post.location.city}</span>
								</p>

								<div className='flex items-center text-sm gap-x-2 text-muted-foreground'>
									<UserIcon className='w-4 h-4 text-blue-700' />
									<span>{post.userFirstName}</span>
								</div>
							</div>
							<p className='text-lg font-semibold'>{post.name}</p>

							<Link
								prefetch={false}
								className='block w-full'
								href={`/posts/${post.id}`}
							>
								<Button className='w-full duration-150 bg-blue-700 hover:bg-blue-700/90'>
									Show more
								</Button>
							</Link>
						</div>
					</Card>
				))}
			</div>
		</div>
	)
}

export default DashboardPage
