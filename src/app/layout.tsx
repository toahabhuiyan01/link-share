import localFont from 'next/font/local'
import './globals.css'
import './styles.css'
import AlertCentral from './_components/AlertCentral'


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
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-50 relative`}
				style={{
					height: '100vh',
					width: '100vw',
				}}
			>
				{children}
				<AlertCentral />
			</body>
		</html>
	)
}
