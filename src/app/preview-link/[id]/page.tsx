import axios from "axios"
import { Metadata } from "next"

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
    const getUser = (await axios(`${origin}/api/user`, { params: { id } })).data

    console.log(getUser)

    return (
        <div>
            <h1>
                Hello
            </h1>
        </div>
    )
}


export default Page