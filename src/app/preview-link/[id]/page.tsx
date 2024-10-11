import { IUser } from "@/app/types"
import axios from "axios"
import { Metadata } from "next"
import TopBar from "./components/TopBar"
import { LinksRender } from "@/app/add-edit-link/[id]/components/MobilePreview"
import { redirect } from "next/navigation"
import './styles.css'
import { REST_API_URL } from "@/app/_utils/constants"

export type PreViewType = {
    params: {
        id: string
    }
}

export const generateMetadata = async ({ params: { id } }: PreViewType) => {
    let user

    try {
        user = (await axios(`${REST_API_URL}/api/user`, { params: { id } })).data
    } catch (error) {
        console.error(error)
        return {} as Metadata
    }

    return {
        title: `${user.firstName} ${user.lastName}`,
        description: `View ${user.firstName} ${user.lastName}'s profile`,
        openGraph: {
            type: "profile",
            images: [user.avatar]
        }
        
    } as Metadata
}


async function Page({ params: { id } }: PreViewType) {
    let userData

    try {
        userData = (await axios<IUser>(`${REST_API_URL}/api/user`, { params: { id } })).data
    } catch (error) {
        console.error(error)
        redirect('/add-edit-link/new')
    }

    return (
        <div
            id="container-preview"
            className="p-4 bg-indigo-600 h-72 rounded-b-3xl relative"
        >
            <TopBar id={id} />
            <div
                id="profile-card"
                className="shadow-lg absolute bg-white px-12 py-10 rounded-xl flex flex-row justify-center items-center"
                style={{
                    width: '18rem',
                    height: '28rem',
                    left: 'calc(50% - 9rem)',
                    top: '52%'
                }}
            >
                <LinksRender
                    fromPreview
                    userData={userData}
                />
            </div>
        </div>
    )
}


export default Page