'use client'

import dynamic from 'next/dynamic';

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
        <>
            <DynamicComponentWithNoSSR />
            {children}
        </>
	)
}