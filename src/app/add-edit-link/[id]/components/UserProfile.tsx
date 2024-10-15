'use client'

import { useFormik } from 'formik'
import { ImageUp } from 'lucide-react'
import NextImage from 'next/image'
import * as Yup from 'yup'

import { IUser } from '@/app/types'
import UserDefaultImage from '@/assets/images/user-avatar.png'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useLinkStore from '@/app/_store/LinkStore'
import useAlertStore from '@/app/_store/AlertStore'
import useDimensionHook from '../../../_hooks/useDimension'
import axios from 'axios'
import { useEffect, useMemo } from 'react'
import { REST_API_URL } from '@/app/_utils/constants'
import { Loader } from '@/app/loading'
import { deepCompare } from '@/app/_utils/deep-compare'

type UserData = Pick<IUser, 'email' | 'avatar' | 'firstName' | 'lastName'>
type KeysUserData = keyof UserData
const fieldMap = {
	firstName: 'First Name *',
	lastName: 'Last Name *',
	email: 'Email',
}


export default function UserProfile() {
	const { userData, setUserData } = useLinkStore()
	const { setAlert } = useAlertStore()

	const { fullWidth, inputStyle, isMobile } = useDimensionHook()
	const formData = useFormik<UserData>({
		initialValues: {
			email: userData?.email || '',
			avatar: userData?.avatar || '',
			firstName: userData?.firstName || '',
			lastName: userData?.lastName || ''
		},
		onSubmit: async(values) => {
			try {
				const response = (await axios.post(
					`${REST_API_URL}/api/user`,
					{
						...values,
						id: userData?._id
					}
				)).data
				
				setUserData({
					...(userData || {}),
					...values,
					_id: response._id as string
				})
				setAlert(
					`Profile ${userData?._id ? 'updated' : 'created'} successfully`,
					'success'
				)
			} catch (e) {
				console.error(e)
			}
		},
		validateOnBlur: true,
		validationSchema: Yup.object().shape({
			email: Yup.string().trim().email('This need to be a valid email'),
			firstName: Yup.string().trim().required('First Name is required'),
			lastName: Yup.string().trim().required('Last Name is required')
		})
	})

	const userValues = formData.values

	const isSame = useMemo(
		() => {
			const { firstName, lastName, avatar, email } = userData || {}
			return deepCompare(userValues, { firstName, lastName, avatar, email })
		},
		[userData, userValues]
	)

	useEffect(
		() => {
			if (userData) {
				formData.setValues({
					email: userData?.email || '',
					avatar: userData?.avatar || '',
					firstName: userData?.firstName || '',
					lastName: userData?.lastName || ''
				})

				formData.setTouched({
					email: false,
					avatar: false,
					firstName: false,
					lastName: false
				})
			}
		},
		[userData]
	)

	return (
		<div
			className='flex flex-col gap-4 bg-white rounded-lg'
			style={
				{
					width: fullWidth ? '100%' : 'calc(60% - .5rem)'
				}
			}
		>
			<div
				className='flex flex-col gap-8 p-8 overflow-scroll'
				style={
					{
						height: 'calc(100% - 6.25rem)'
					}
				}
			>
				<div className='flex flex-col gap-1'>
					<p className='text-3xl font-extrabold'>
						Profile Details
					</p>
					<p className='text-sm font-medium text-gray-600'>
						Add your details to create a personal touch to your profile
					</p>
				</div>

				<div
					className={`flex ${inputStyle} gap-4 justify-between items-center bg-stone-50 p-4 rounded-lg`}
				>
					<p className='text-sm font-medium text-gray-500'>
						Profile Picture
					</p>
					<div
						id='image-container'
						style={
							{
								width: '200px',
								height: '200px',
								position: 'relative'
							}
						}
					>
						<AspectRatio
							className='flex items-center justify-center'
							ratio={1 / 1}
						>
							<NextImage
								height={200}
								width={200}
								alt='Profile Picture'
								className='rounded-lg image-subject object-cover'
								id='profile-picture'
								src={userValues.avatar || UserDefaultImage}
								style={
									{
										maxHeight: '200px',
										maxWidth: '200px',
										minHeight: '200px',
										minWidth: '200px'
									}
								}
							/>

							<input
								accept='.jpg, .png, .bmp'
								className='hidden'
								id='file-input'
								name='avatar'
								onChange={
									event => {
										const file = event.target.files![0]
										if(!file) {
											return
										}

										const urlData = URL.createObjectURL(file)
										try {
											const reader = new FileReader()

											reader.onload = (e) => {
												const img = new Image()
												img.src = urlData

												img.onload = () => {
													formData.handleBlur(event)
													if(img.width > 1024 || img.height > 1024) {
														console.log('Image must be below 1024x1024')
														setAlert('Image must be below 1024x1024', 'error')

														return
													}

													formData.setFieldError('avatar', undefined)
													formData.setFieldValue('avatar', e.target!.result as string)
												}
											}

											reader.readAsDataURL(file)
										} catch(e) {
											console.error(e)
										}
									}
								}
								type='file'
							/>
						</AspectRatio>
						<div
							className='hover:bg-blend-darken hidden absolute curosr-pointer flex flex-col items-center justify-center gap-2 bg-transparent rounded-lg p-4'
							id='image-overlay'
							onClick={
								() => {
									const element = document.getElementById('file-input')
                                    element!.click()
								}
							}
							style={
								{
									top: 0,
									left: 0,
									height: '100%',
									width: '100%'
								}
							}
						>
							<ImageUp />
							<p className='text-sm text-center text-nowrap font-semibold'>
								{ userValues.avatar ? 'Change Image' : 'Upload Image'}
							</p>
						</div>
						{
							formData.touched.avatar && formData.errors.avatar ? (
								<p className='text-xs text-rose-700'>
									{formData.errors.avatar}
								</p>
							) : null
						}
					</div>
					<div className='flex flex-col'>
						<p className='text-xs font-medium text-gray-500'>
							Image must be below 1024x1024.
						</p>
						<p className='text-xs font-medium text-gray-500'>
							Use PNG,JPG, or BMP format
						</p>
					</div>
				</div>

				<div className='flex flex-col gap-3 bg-stone-50 p-4 rounded-lg'>
					{
						Object.keys(fieldMap).map((key) => {
							const field = key as KeysUserData

							return (
								<div
									className='flex flex-col'
									key={key}>
									<div className={`flex ${inputStyle} justify-between`}>
										<Label className='text-nowrap text-sm text-gray-500 font-semibold'>
											{fieldMap[key as keyof typeof fieldMap]}
										</Label>
										<Input
											className='w-full bg-white border-solid border-2 h-10 p-2 w-96 rounded-lg'
											style={{
												maxWidth: '100%'
											}}
											name={field}
											onBlur={formData.handleBlur}
											onChange={(e) => formData.setFieldValue(field, e.target.value)}
											type='text'
											value={userValues[field]}
										/>
									</div>
									{
										formData.touched[field] && formData.errors[field] ? (
											<p className='text-xs text-rose-700'>
												{formData.errors[field]}
											</p>
										) : null
									}
								</div>
							)
						})
					}
				</div>
			</div>
			<div className='w-full'>
				<hr />
				<div className='flex justify-end px-8'>
					<Button
						className={`${isMobile ? 'w-full' : 'w-24'} h-10 mt-4 bg-indigo-600 text-white font-semibold`}
						disabled={!formData.isValid || formData.isSubmitting || isSame}
						onClick={formData.submitForm}
					>
						{ formData.isSubmitting ? <Loader /> : 'Save'}
					</Button>
				</div>
			</div>
		</div>
	)
}