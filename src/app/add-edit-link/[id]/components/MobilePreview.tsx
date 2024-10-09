'use client'

import useLinkStore from "@/app/store/LinkStore"

export default function MobilePreview() {
    const { userData } = useLinkStore()
    return (
        <div
            style={{
                width: '40%'
            }}
        >
            
        </div>
    )
}