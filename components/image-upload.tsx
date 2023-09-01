'use client'

import { ExpandIcon, ImagePlusIcon, SparklesIcon } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'

import { ManageImageModal } from '@/components/modals/manage-image-modal'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useManageImageModal } from '../hooks/use-manage-image-modal'

interface Props {
	images: string[]
	onChange: (url: string) => void
	onDelete: (url: string) => void
	onSetFeatured: (url: string) => void
}

export const ImageUpload = ({
	images,
	onChange,
	onDelete,
	onSetFeatured,
}: Props) => {
	const { onOpen } = useManageImageModal()
	const [selectedImage, setSelectedImage] = useState<string>('')

	const onUpload = (result: any) => {
		if (result.event === 'success') {
			onChange(result.info.url)
		}
	}

	const onOpenImageModal = (imageUrl: string) => {
		setSelectedImage(imageUrl)
		onOpen()
	}

	return (
		<>
			<ManageImageModal
				imageUrl={selectedImage}
				isFeatured={selectedImage === images[0]}
				onDelete={onDelete}
				onSetFeatured={onSetFeatured}
			/>
			<div className='mt-2'>
				{!!images?.length && (
					<div className='relative w-full h-[300px] group'>
						<div className='absolute z-50 flex items-center gap-2 p-2 bg-blue-700 rounded-md top-2 left-2 text-primary-foreground'>
							<SparklesIcon className='w-4 h-4' />

							<span className='text-sm'>Main image</span>
						</div>

						<Image
							fill
							src={images[0]}
							alt='Main photo'
							className='object-cover rounded-md'
						/>

						<Button
							type='button'
							className='absolute z-50 hidden p-2 group-hover:flex right-2 top-2'
							size='icon'
							variant='outline'
							onClick={() => onOpenImageModal(images[0])}
						>
							<ExpandIcon className='w-4 h-4' />
						</Button>
					</div>
				)}

				<div
					className={cn(
						'grid grid-cols-1 gap-2 mt-2',
						images.length > 1 && 'grid-cols-1 sm:grid-cols-3'
					)}
				>
					{[...images].splice(1).map((image) => (
						<div
							key={image}
							className='relative w-full group h-[150px] sm:h-[100px]'
						>
							<Image
								fill
								src={image}
								alt=''
								className='object-cover rounded-md'
							/>

							<Button
								type='button'
								className='absolute z-50 hidden p-2 group-hover:flex right-2 top-2'
								size='sm'
								variant='outline'
								onClick={() => onOpenImageModal(image)}
							>
								<ExpandIcon className='w-4 h-4' />
							</Button>
						</div>
					))}
					<CldUploadWidget
						onUpload={onUpload}
						uploadPreset='dprshb7r'
					>
						{({ open }) => {
							const onOpen = () => {
								open()
							}

							return (
								<div
									className={cn(
										'flex items-center justify-center p-10 border-2 border-dashed rounded-md cursor-pointer bg-gray-300/20 gap-x-4',
										images.length > 0 && 'p-4',
										images.length === 4 && 'hidden'
									)}
									onClick={onOpen}
								>
									<ImagePlusIcon className='w-5 h-5 text-muted-foreground' />
									<span
										className={cn(
											'text-sm text-muted-foreground inline-block',
											images.length > 1 &&
												'inline-block sm:hidden md:inline-block'
										)}
									>
										Add image
									</span>
								</div>
							)
						}}
					</CldUploadWidget>
				</div>
			</div>
		</>
	)
}
