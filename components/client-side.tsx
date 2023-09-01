'use client'

import { useEffect, useState } from 'react'

export const ClientSide = ({ children }: { children: React.ReactNode }) => {
	const [mounted, setMounted] = useState<boolean>(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return <>{children}</>
}
