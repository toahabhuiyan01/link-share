import { IUser } from "@/app/types"
import axios from "axios"
import { Metadata } from "next"
import TopBar from "./components/TopBar"
import { LinksRender } from "@/app/add-edit-link/[id]/components/MobilePreview"

export type PreViewType = {
    params: {
        id: string
    }
}

export const generateMetadata = async ({ params: { id } }: PreViewType) => {
    const origin = process.env.NEXT_PUBLIC_ORIGIN
    const user = (await axios(`${origin}/api/user`, { params: { id } })).data

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
    const origin = process.env.NEXT_PUBLIC_ORIGIN
    const userData = (await axios<IUser>(`${origin}/api/user`, { params: { id } })).data


    return (
        <div className="p-4 bg-indigo-600 h-72 rounded-b-3xl relative"
        >
            <TopBar id={id} />
            <div
                className="shadow-lg bg-white p-8 rounded-lg flex flex-row justify-center items-center w-72"
            >
                <LinksRender
                    fromPreview
                    userData={{
                        ...userData,
                        avatar: undefined,
                        links: [
                            {
                                id: '1',
                                name: 'WhatsApp',
                                url: 'https://wa.me/1234567890'
                            },
                            {
                                id: '2',
                                name: 'LinkedIn',
                                url: 'https://www.linkedin.com/in/username'
                            },
                            {
                                id: '3',
                                name: 'Github',
                                url: 'https://github.com'
                            }
                        ]
                    }}
                />
            </div>
        </div>
    )
}


export default Page