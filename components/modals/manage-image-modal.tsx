'use client'

import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { useManageImageModal } from '@/hooks/use-manage-image-modal'

import { SparklesIcon, TrashIcon } from 'lucide-react'
import { Modal } from './modal'

interface Props {
	imageUrl: string
	isFeatured?: boolean
	onDelete: (imageUrl: string) => void
	onSetFeatured: (imageUrl: string) => void
}

export const ManageImageModal = ({ imageUrl, isFeatured, onDelete, onSetFeatured }: Props) => {
	const { open, onClose } = useManageImageModal()

	const onDeleteImage = () => {
		onDelete(imageUrl)
		onClose()
	}

	const onSetFeaturedImage = () => {
		onSetFeatured(imageUrl)
		onClose()
	}

	return (
		<Modal title='Manage image' open={open} onClose={onClose}>
			<div className='flex flex-col gap-4'>
				<div className='relative aspect-square'>
					<Image fill src={imageUrl} alt='Image' className='object-contain rounded-md' />
				</div>

				<div className='flex flex-wrap items-center justify-between'>
					<Button variant='destructive' className='gap-4' onClick={onDeleteImage}>
						<TrashIcon className='w-4 h-4' />
						<span className='hidden sm:inline-block'>Delete</span>
					</Button>

					<Button variant='outline' className='gap-4' disabled={isFeatured} onClick={onSetFeaturedImage}>
						<SparklesIcon className='w-4 h-4' />
						Set as featured
					</Button>
				</div>
			</div>
		</Modal>
	)
}
