'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import useAlertStore from '@/app/store/AlertStore'

function TopBar({ id }: { id: string }) {
    const { setAlert } = useAlertStore()
    const origin = process.env.NEXT_PUBLIC_ORIGIN
    return (
        <div
            id='topbar'
            className="bg-white flex justify-between py-2 px-4 rounded-lg"
        >
            <Button
                variant='outline'
                className="border-2 border-indigo-600 h-10"
            >
                <Link
                    href={`/add-edit-link/${id}`}
                    className='text-indigo-500 font-semibold'
                >
                    Back To Editor
                </Link>
            </Button>

            <Button
                className="bg-indigo-600 text-indigo-100 font-semibold h-10 w-32"
                onClick={
                    () => {
                        navigator.clipboard.writeText(`${origin}/preview-link/${id}`)
                        setAlert(
                            'Link copied to clipboard',
                            'success'
                        )
                    }
                }
            >
                Share Link
            </Button>

        </div>
    );
}

export default TopBar