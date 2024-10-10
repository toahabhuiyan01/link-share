'use client'

import { useEffect } from 'react'
import localFont from 'next/font/local'
import './globals.css'
import './styles.css'
import useDimensionStore from './store/DimensionStore'


const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export default function RootLayout({
	children,
}: Readonly<{
  children: React.ReactNode
}>) {
	const { subscribe } = useDimensionStore()
	useEffect(subscribe, [])

	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-50`}
			>
				{children}
			</body>
		</html>
	)
}
