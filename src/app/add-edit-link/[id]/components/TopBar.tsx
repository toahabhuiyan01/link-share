'use client'

import { CircleUserRound, Eye, Link } from 'lucide-react'
import Image from 'next/image'
import LinkImg from '../../../../assets/images/Link.svg'
import useDimensionHook from '../../../_hooks/useDimension'

import NextLink from 'next/link'

import useLinkStore from '@/app/_store/LinkStore'
import { IView } from '@/app/types'
import { Button } from '@/components/ui/button'

const ICON_MAP: {[_: string]: JSX.Element} = {
	'Links': <Link style={{ width: '18px' }} />,
	'Profile Details': <CircleUserRound style={{ width: '18px' }} />
}

export default function TopBar() {
	const { selectedView, setSelectedView, userData } = useLinkStore()

	const { showIconsOnly } = useDimensionHook()

	return (
		<div
			className='flex flex-row justify-between items-center py-4 bg-white rounded-lg px-8'
		>
			<div className='flex flex-row items-center gap-2 cursor-pointer'>
				<Image
					alt='Link'
					className='bg-indigo-500 rounded-lg'
					src={LinkImg}
					style={
						{
							height: '30px',
							width: '30px'
						}
					}
				/>
				{
					!showIconsOnly && (
						<p className='text-2xl font-bold'>
							devlinks
						</p>
					)
				}
			</div>
			<div className='flex flex-row gap-4'>
				{
					['Links', 'Profile Details'].map((item) => (
						<Button
							className={`${showIconsOnly ? 'w-16' : 'w-40'} flex flex-row gap-2 text-sm font-bold ${selectedView === item ? 'bg-indigo-100 text-indigo-500' : ' text-gray-600'}`}
							key={item}
							disabled={ !userData && item === 'Links'}
							onClick={() => setSelectedView(item as IView)}
							variant={ selectedView === item ? 'secondary' : 'ghost'}
						>
							{ICON_MAP[item]}
							{showIconsOnly ? '' : item}
						</Button>
					))
				}
			</div>
			<Button
				className={`${showIconsOnly ? 'w-16' : 'w-32'} text-sm font-semibold text-indigo-600 border-indigo-800 border-2`}
				variant='outline'
				disabled={!userData}
				onClick={
					() => {
						
					}
				}
			>
				<NextLink href={`/preview-link/${userData?._id}`}>
					{showIconsOnly ? <Eye /> : 'Preview'}
				</NextLink>
			</Button>
		</div>
	)
}