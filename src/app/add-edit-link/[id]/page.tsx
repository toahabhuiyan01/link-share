'use client'
import axios from 'axios'
import Link from './components/Links'
import TopBar from './components/TopBar'
import MobilePreview from './components/MobilePreview'
import useLinkStore from "@/app/store/LinkStore"
import UserProfile from './components/UserProfile'


export default function Page() {
    const { userData, selectedView } = useLinkStore()

    // const data = axios('/api/user')


    return (
        <div
            className='flex flex-col gap-4 bg-stone-50 p-4 overflow-hidden'
        >
            <TopBar />
            <div
                className='flex flex-row justify-between'
                style={{
                    height: 'calc(100vh - 120px)'
                }}
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