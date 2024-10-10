'use client'

import localFont from 'next/font/local'
import './globals.css'
import './styles.css'
import dynamic from 'next/dynamic'


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

const DynamicComponentWithNoSSR = dynamic(
  () =>  import('./ImportDimensionHelper'),
  { ssr: false }
)

export default function RootLayout({
	children,
}: Readonly<{
  children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<DynamicComponentWithNoSSR />
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-50`}
			>
				{children}
			</body>
		</html>
	)
}
