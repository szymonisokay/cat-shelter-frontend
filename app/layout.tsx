import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import { ClientSide } from '../components/client-side'
import './globals.css'

const poppins = Poppins({
	weight: ['400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Shelter Online',
	description: 'Shelter Online',
}

export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={poppins.className}>
				<Toaster />
				<ClientSide>{children}</ClientSide>
			</body>
		</html>
	)
}
