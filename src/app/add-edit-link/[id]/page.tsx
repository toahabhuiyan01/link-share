'use client'

import { useEffect } from 'react'
import LinkView from './components/Links'
import MobilePreview from './components/MobilePreview'
import TopBar from './components/TopBar'
import UserProfile from './components/UserProfile'

import useLinkStore from '@/app/_store/LinkStore'
import { NextResponse } from 'next/server'
import Loading from '@/app/loading'

type PageProps = {
	params: {
		id: string
	}
}
export default function Page({ params: { id } }: PageProps) {
	const { selectedView, setSelectedView, fetchAndSetUserData, loading } = useLinkStore()

	useEffect(
		() => {
			if(id === 'new') {
				setSelectedView('Profile Details')

				return
			}

			getUserData()
		},
		[]
	)

	async function getUserData() {
		try {
			await fetchAndSetUserData(id)
		} catch(error) {
			console.log(error)
			NextResponse.redirect(new URL('/add-edit-link/new', ))
		}
	}

	return (
		<div
			className='flex flex-col gap-4 bg-stone-50 p-4 overflow-hidden relative'
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
						<LinkView />
					) : (
						<UserProfile />
					)
				}
			</div>
			{loading && <Loading />}
		</div>
	)
}