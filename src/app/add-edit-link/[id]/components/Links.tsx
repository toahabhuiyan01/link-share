'use client'

import { closestCorners, DndContext, DragEndEvent, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useFormik } from 'formik'
import { GripHorizontal } from 'lucide-react'
import * as Yup from 'yup'
import { ILink, IUser } from '../../../types'
import { platformTheme, PlatformType, REST_API_URL } from '../../../_utils/constants'
import useDimensionHook from '../../../_hooks/useDimension'

import useLinkStore from '@/app/_store/LinkStore'
import useAlertStore from '@/app/_store/AlertStore'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Loader } from '@/app/loading'

const SOCILE_MEDIA = Object.keys(platformTheme)
const DEFAULT_LINK = { id: getRandomString(), name: '', url: '' }

function Link() {
	const { userData, setUserData } = useLinkStore()
	const { setAlert } = useAlertStore()
	const { fullWidth } = useDimensionHook()
	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	const linkForm = useFormik<{ links: ILink[] }>({
		initialValues: { links: userData?.links || [] },
		validateOnBlur: true,
		onSubmit: async(values) => {
			try {
				await axios.post(
					`${REST_API_URL}/api/user`,
					{
						...values,
						id: userData?._id
					}
				)
				
				setUserData({
					...(userData as IUser),
					links: values.links
				})

				setAlert(
					'Links updated successfully',
					'success'
				)
			} catch (e) {
				console.error(e)
			}
		},
		validationSchema: Yup.object().shape({
			links: Yup.array().of(
				Yup.object().shape({
					name: Yup.string().trim().required('Select a Platform'),
					url: Yup.string().trim().required('URL is required').url('This need to be a valid URL')
				})
			)
		})
	})

	useEffect(
		() => {
			linkForm.setValues({ links: userData?.links || [] })
			linkForm.setTouched({})
		},
		[userData]
	)

	const formLinks = linkForm.values.links

	return (
		<div
			className='flex flex-col bg-white rounded-lg'
			style={
				{
					width: fullWidth ? '100%' : 'calc(60% - .5rem)'
				}
			}
		>
			<div
				className='flex flex-col gap-4 p-8 bg-white rounded-lg'
			>
				<div className='flex flex-col gap-1'>
					<p className='text-3xl font-extrabold'>
						Customize your links
					</p>
					<p className='text-sm font-medium text-gray-600'>
						Add/edit/remove links below and then share all your profiles with the world!
					</p>
				</div>

				<Button
					className='w-full border-solid border-2 h-10 border-indigo-800 text-indigo-600 font-semibold'
					onClick={
						() => {
							linkForm.setValues(values => ({ links: [{ id: getRandomString(), name: '', url: '' }, ...values.links, ] }))
						}
					}
					variant='outline'
				>
					+ Add new link
				</Button>

				<div
					className='flex flex-col gap-4 overflowY-scroll'
					style={
						{
							maxHeight: 'calc(100vh - 25nerem) !important',
							height: 'calc(100vh - 25rem)',
							overflowY: 'scroll'
						}
					}
				>
					<DndContext
						collisionDetection={closestCorners}
						onDragEnd={
							({ active, over }: DragEndEvent) => {
								if(active.id === over?.id) {
									return
								}

								linkForm.setValues(prev => {
									const newPrev = { ...prev }

									const draggeditem = newPrev.links.splice(active.id as number, 1)[0]
									newPrev.links.splice(+(over?.id || 0), 0, draggeditem)

									return newPrev
								})
							}
						}
						sensors={sensors}
					>
						{
							formLinks.length ? (
								<SortableContext
									items={formLinks.map((_, index) => index.toString())}
									strategy={verticalListSortingStrategy}
								>
									{
										formLinks.map((link, index) => (
											<EditLink
												errors={linkForm.errors.links?.[index]}
												handleChange={linkForm.setFieldValue}
												index={index}
												key={link.id}
												link={link}
												onBlur={linkForm.handleBlur}
												onRemoveLink={
													() => {
														linkForm.setValues(
															values => {
																const links = values.links.filter((_, i) => i !== index)
																return {
																	...values,
																	links: links.length ? links : [DEFAULT_LINK]
																}
															}
														)
													}
												}
												touched={linkForm.touched.links?.[index]}
											/>
										))
									}
								</SortableContext>
							) : (
								<div className='flex justify-center h-full items-center'>
									<p className='text-gray-500 text-base font-semibold'>
										No links added
									</p>
								</div>
							)
						}
					</DndContext>
				</div>
			</div>
			<div>
				<hr />
				<div className='flex justify-end px-8'>
					<Button
						disabled={!linkForm.isValid || linkForm.isSubmitting}
						className='w-24 h-10 mt-4 bg-indigo-600 text-white font-semibold'
						onClick={linkForm.submitForm}
					>
						{linkForm.isSubmitting ? <Loader /> : 'Save'}
					</Button>
				</div>
			</div>
		</div>
	)
}

type EditLinkProps = {
    link: ILink
	index: number
    touched?: { [key: string]: boolean } | null
    errors?: { [key: string]: string } | null | string
	handleChange: (name: string, value: string) => void
	onRemoveLink: () => void
	onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
function EditLink({ handleChange, index, link, onBlur, onRemoveLink, errors, touched }: EditLinkProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition
	} = useSortable({ id: index.toString() })

	errors = errors || {}

	return (
		<div
			className='flex flex-col gap-2 bg-stone-50 rounded-lg'
			key={link.name}
			ref={setNodeRef}
			style={
				{
					padding: '1rem',
					transform: CSS.Transform.toString(transform),
					transition
				}
			}
		>
			<div className='flex flex-row justify-between'>
				<div className='flex flex-row items-center gap-2'>
					<GripHorizontal
						{...attributes}
						{...listeners}
						style={{ cursor: 'grab', width: '1.25rem' }}
					/>
					<p className='text-gray-500 text-base font-semibold'>
						Link #
						{index + 1}
					</p>
				</div>
				<Button
					className='text-gray-500 font-medium text-sm'
					onClick={onRemoveLink}
					variant='ghost'
				>
					Remove
				</Button>
			</div>
			<div
			>
				<p className='text-xs font-semibold text-gray-500'>
					Platform
				</p>
				<Select
					// @ts-expect-error here we need to forfully pass the event
					onOpenChange={isOpen => !isOpen && onBlur({ target: { name: `links[${index}].name`, value: link.name } })}
					onValueChange={
						val => {
							handleChange(`links[${index}].name`, val)
						}
					}
					value={link.name}
				>
					<SelectTrigger
						style={
							{
								height: '2.5rem',
								backgroundColor: 'white'
							}
						}
					>
						<SelectValue placeholder='Select a Platfrom' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>
								Platform
							</SelectLabel>
							{
								SOCILE_MEDIA.map((item) => (
									<SelectItem
										key={item}
										value={item}
									>
										<div className='flex flex-row gap-2'>
											<Image
												height={20}
												width={20}
												src={platformTheme[item as PlatformType].icon}
												alt='icon'
											/>
											{item}
										</div>
									</SelectItem>
								))
							}
						</SelectGroup>
					</SelectContent>
				</Select>
				{
					// @ts-expect-error error will be an object if there is links
					touched?.name && ('name' in errors && errors.name) ? (
						<p className='text-xs text-rose-700'>
							{errors.name}
						</p>
					) : null
				}
			</div>

			<div>
				<p className='text-xs font-semibold text-gray-500'>
					Link
				</p>
				<Input
					className='bg-white'
					name={`links[${index}].url`}
					onBlur={e => onBlur(e)}
					onChange={
						e => {
							handleChange(`links[${index}].url`, e.target.value)
						}
					}
					style={
						{
							height: '2.5rem',
						}
					}
					type='text'
					value={link.url}
				/>

				{
					// @ts-expect-error error will be an object if there is links
					touched?.url && ('url'  in errors && errors?.url) ? (
						<p className='text-xs text-rose-700'>
							{errors.url}
						</p>
					) : null
				}
			</div>
		</div>
	)

}

function getRandomString() {
	return Math.random().toString(36).substring(7)
}

export default Link