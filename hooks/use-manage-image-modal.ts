import { create } from 'zustand'

interface UseManageImageModalStore {
	open: boolean
	onOpen: () => void
	onClose: () => void
}

export const useManageImageModal = create<UseManageImageModalStore>((set) => ({
	open: false,
	onOpen: () => set({ open: true }),
	onClose: () => set({ open: false }),
}))
