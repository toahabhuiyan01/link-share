'use client'

import useLinkStore from "@/app/store/LinkStore"
import MobileMockup from '../../../../assets/images/Mobile.png'
import UserImage from '../../../../assets/images/user-avatar.png'
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { platformTheme } from "../constants"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getContrastTextColor } from "../utils"

type PlatformType = keyof typeof platformTheme
export default function MobilePreview() {
    const { userData } = useLinkStore()
    return (
        <div
            className="flex justify-center items-center bg-white rounded-lg"
            style={{
                width: 'calc(40% - .5rem)',
                height: '100%'
            }}
        >
            <div
                style={{
                    position: 'relative',
                    width: 'fit-content !important',
                    height: 'fit-content !important'
                }}
            >
                <Image
                    src={MobileMockup}
                    alt="Mobile Mockup"
                    style={{
                        width: '278px',
                        height: '548px'
                    }}
                />

                <div
                    className="absolute w-9/12 items-center p-1"
                    style={{
                        top: '4rem',
                        left: '2rem'
                    }}
                >
                    <div className="flex flex-col justify-center w-full gap-8"> 
                        <div className="flex flex-col gap-6 items-center w-full">
                            <Image
                                src={userData?.avatar || UserImage}
                                alt="Profile Picture"
                                className="border-2 border-purple-700"
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%'
                                }}
                            />
                            <div className="w-full gap-1 flex flex-col items-center">
                            {
                                userData?.firstName || userData?.lastName ? (
                                    <p className="text-lg font-bold">
                                        {userData?.firstName} {userData?.lastName}
                                    </p>
                                ) : (
                                    <p className="h-3 w-9/12 bg-gray-200 rounded-lg" />
                                )
                            }
                            {
                                userData?.email ? (
                                    <p className="text-xs text-gray-400">
                                        {userData?.email}
                                    </p>
                                ) : (
                                    <p className="h-2 w-5/12 rounded-lg bg-gray-200" />
                                )
                            }
                            </div>
                        </div>

                        <div
                            className="flex flex-col gap-3 overflow-y-auto"
                            style={{
                                maxHeight: '15.5rem'
                            }}
                        >
                            {
                                userData?.links.map((link) => {
                                    const linkColorTheme = platformTheme[link.name as PlatformType]
                                    return (
                                        <div
                                            key={link.id}
                                            className="flex flex-row justify-between items-center p-4 rounded-lg h-10 gap-4"
                                            style={{
                                                background: linkColorTheme.color
                                            }}
                                        >
                                            <div className="flex flex-row items-center gap-2">
                                                <Image
                                                    src={linkColorTheme.icon}
                                                    alt={link.name}
                                                    className="bg-white rounded"
                                                    style={{ width: '1.25rem', height: '1.25rem' }}
                                                />
                                                <p 
                                                    className='text-gray-500 text-xs font-semibold'
                                                    style={{
                                                        color: getContrastTextColor(linkColorTheme.color)
                                                    }}
                                                >
                                                    {link.name}
                                                </p>
                                            </div>

                                            <Link
                                                target="_blank"
                                                href={link.url}
                                            >
                                                <ArrowRight
                                                    color={getContrastTextColor(linkColorTheme.color)} 
                                                    style={{ width: '1.25rem' }}
                                                />
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}