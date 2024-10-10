'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { platformTheme } from '../constants'
import { getContrastTextColor } from '../utils'

import useLinkStore from '@/app/store/LinkStore'
import MobileMockup from '@/assets/images/Mobile.png'
import UserImage from '@/assets/images/user-avatar.png'

type PlatformType = keyof typeof platformTheme
export default function MobilePreview() {
	const { userData } = useLinkStore()

	return (
		<div
			className='flex justify-center items-center bg-white rounded-lg'
			style={
				{
					width: 'calc(40% - .5rem)',
					height: '100%'
				}
			}
		>
			<div
				style={
					{
						position: 'relative',
						width: 'fit-content !important',
						height: 'fit-content !important'
					}
				}
			>
				<Image
					alt='Mobile Mockup'
					src={MobileMockup}
					style={
						{
							width: '278px',
							height: '548px'
						}
					}
				/>

				<div
					className='absolute w-9/12 items-center p-1 px-10 py-8'
					style={
						{
							width: '100%',
							top: '4rem',
							left: 0,

						}
					}
				>
					<div className='flex flex-col justify-center w-full gap-8'>
						<div className='flex flex-col gap-6 items-center w-full'>
							<Image
								alt='Profile Picture'
								className='border-2 border-purple-700'
								src={userData?.avatar || UserImage}
								style={
									{
										width: '80px',
										height: '80px',
										borderRadius: '50%'
									}
								}
							/>
							<div className='w-full gap-1 flex flex-col items-center'>
								{
									userData?.firstName || userData?.lastName ? (
										<p className='text-lg font-bold'>
											{userData?.firstName}
											{' '}
											{userData?.lastName}
										</p>
									) : (
										<p className='h-3 w-9/12 bg-gray-200 rounded-lg' />
									)
								}
								{
									userData?.email ? (
										<p className='text-xs text-gray-400'>
											{userData?.email}
										</p>
									) : (
										<p className='h-2 w-5/12 rounded-lg bg-gray-200' />
									)
								}
							</div>
						</div>

						<div
							className='flex flex-col gap-3 overflow-y-auto'
							style={
								{
									maxHeight: '14rem'
								}
							}
						>
							{
								userData?.links.map((link) => {
									const linkColorTheme = platformTheme[link.name as PlatformType]

									return (
										<div
											className='flex flex-row justify-between items-center p-4 rounded-lg h-10 gap-4'
											key={link.id}
											style={
												{
													background: linkColorTheme.color
												}
											}
										>
											<div className='flex flex-row items-center gap-2'>
												<Image
													alt={link.name}
													className='bg-white rounded'
													src={linkColorTheme.icon}
													style={{ width: '1.25rem', height: '1.25rem' }}
												/>
												<p
													className='text-gray-500 text-xs font-semibold'
													style={
														{
															color: getContrastTextColor(linkColorTheme.color)
														}
													}
												>
													{link.name}
												</p>
											</div>

											<Link
												href={link.url}
												target='_blank'
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
							{
								!userData?.links.length && (
									[1, 2, 3].map((_, index) => (
										<p
											className='h-10 w-full bg-gray-200 rounded-lg'
											key={index}
										/>
									))
								)
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}