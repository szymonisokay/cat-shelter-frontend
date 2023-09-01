'use client'

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'

interface Props {
	title: string
	open: boolean
	onClose: () => void
	children?: React.ReactNode
}

export const Modal = ({ title, open, onClose, children }: Props) => {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader className='text-lg font-semibold tracking-tight'>
					{title}
				</DialogHeader>
				<div className='flex-[2]'>{children}</div>
			</DialogContent>
		</Dialog>
	)
}
