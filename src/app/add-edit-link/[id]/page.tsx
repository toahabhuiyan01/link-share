'use client'

import { useEffect } from 'react'
import LinkView from './components/Links'
import MobilePreview from './components/MobilePreview'
import TopBar from './components/TopBar'
import UserProfile from './components/UserProfile'

import useLinkStore from '@/app/_store/LinkStore'
import useAlertStore from '@/app/_store/AlertStore'
import Loading from '@/app/loading'
import axios from 'axios'
import { REST_API_URL } from '@/app/_utils/constants'

type PageProps = {
	params: {
		id: string
	}
}
export default function Page({ params: { id } }: PageProps) {
	const { selectedView, setSelectedView, setUserData, loading, setLoading } = useLinkStore()
	const { setAlert } = useAlertStore()

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
		setLoading(true)
		try {
			const data = (await axios(`${REST_API_URL}/api/user`, { params: { id } })).data
			setUserData({ ...data})
		} catch(error) {
			console.log(error)
			
			setSelectedView('Profile Details')
			setAlert('Profile not found, create a new profile', 'error')

		}
		setLoading(false)
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