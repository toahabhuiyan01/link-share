'use client'

import Link from './components/Links'
import MobilePreview from './components/MobilePreview'
import TopBar from './components/TopBar'
import UserProfile from './components/UserProfile'

import useLinkStore from '@/app/store/LinkStore'


export default function Page() {
	const { selectedView } = useLinkStore()

	// const data = axios('/api/user')


	return (
		<div
			className='flex flex-col gap-4 bg-stone-50 p-4 overflow-hidden'
		>
			<TopBar />
			<div
				className='flex flex-row justify-between'
				style={
					{
						height: 'calc(100vh - 120px)'
					}
				}
			>
				<MobilePreview />
				{
					selectedView === 'Links' ? (
						<Link />
					) : (
						<UserProfile />
					)
				}
			</div>
		</div>
	)
}