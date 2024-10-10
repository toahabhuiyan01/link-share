import { IUser } from "@/app/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import UserDefaultImage from '@/assets/images/user-avatar.png'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { ImageUp } from "lucide-react";
import NextImage from "next/image";
import * as Yup from 'yup'
import { Button } from "@/components/ui/button";

type UserData = Pick<IUser, 'email' | 'avatar' | 'firstName' | 'lastName'>
type KeysUserData = keyof UserData
const fieldMap = {
    firstName: 'First Name *',
    lastName: 'Last Name *',
    email: 'Email',
}



export default function UserProfile() {
    const formData = useFormik<UserData>({
        initialValues: {
            email: '',
            avatar: '',
            firstName: '',
            lastName: ''
        },
        onSubmit: (values) => {
            console.log(values)
        },
        validateOnBlur: true,
        validationSchema: Yup.object().shape({
            email: Yup.string().trim().email('This need to be a valid email'),
            avatar: Yup.string().trim().required('Profile Picture is required'),
            firstName: Yup.string().trim().required('First Name is required'),
            lastName: Yup.string().trim().required('Last Name is required')
        })
    })

    const userValues = formData.values

    return (
        <div
            className='flex flex-col gap-4 bg-white rounded-lg'
            style={{
                width: 'calc(60% - .5rem)'
            }}
        >
            <div 
                className="flex flex-col gap-8 p-8"
                style={{
                    height: 'calc(100% - 6.25rem)'
                }}
            >
                <div className='flex flex-col gap-1'>
                    <p className='text-3xl font-extrabold'>Profile Details</p>
                    <p className='text-sm font-medium text-gray-600'>Add your details to create a personal touch to your profile</p>
                </div>

                <div
                    className="flex flex-row gap-4 justify-between items-center bg-stone-50 p-4 rounded-lg"
                >
                    <p className="text-sm font-medium text-gray-500">
                        Profile Picture
                    </p>
                    <div 
                        id="image-container" 
                        style={{
                            width: '200px',
                            height: '200px',
                            position: 'relative' 
                        }}
                    >
                        <AspectRatio
                            ratio={1/1}
                            className="flex items-center justify-center"
                        >
                            <NextImage
                                id="profile-picture"
                                className="rounded-lg image-subject"
                                src={userValues.avatar || UserDefaultImage}
                                alt="Profile Picture"
                                width={200}
                                height={200}
                                style={{
                                    maxHeight: '200px',
                                    maxWidth: '200px'
                                }}
                            />
                            
                            <input
                                id='file-input'
                                name='avatar'
                                type="file"
                                className="hidden"
                                onChange={
                                    event => {
                                        const file = event.target.files![0]
                                        if(!file) return
                                        const urlData = URL.createObjectURL(file)
                                        try {
                                            const reader = new FileReader()

                                            reader.onload = (e) => {
                                                const img = new Image()
                                                img.src = urlData

                                                img.onload = () => {
                                                    if(img.width > 1024 || img.height > 1024) {
                                                        formData.setFieldError('avatar', 'Image must be below 1024x1024')
                                                        return
                                                    }

                                                    formData.setFieldValue('avatar', e.target!.result as string)
                                                    formData.handleBlur(event)
                                                }
                                            }
                                            reader.readAsDataURL(file)
                                        } catch(e) {

                                        }
                                    }
                                }
                                accept=".jpg, .png, .bmp" 
                            />
                        </AspectRatio>
                        <div
                            id="image-overlay"
                            className="hover:bg-blend-darken hidden absolute curosr-pointer flex flex-col items-center justify-center gap-2 bg-transparent rounded-lg p-4"
                            style={{
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%'
                            }}
                            onClick={
                                () => {
                                    const element = document.getElementById('file-input')
                                    element!.click()
                                }
                            }
                        >
                            <ImageUp />
                            <p className="text-sm text-center text-nowrap font-semibold">{ userValues.avatar ? "Change Image" : "Upload Image"}</p>
                        </div>
                        {
                            formData.touched.avatar && formData.errors.avatar ? (
                                <p>{formData.errors.avatar}</p>
                            ) : null
                        }
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs font-medium text-gray-500">
                            Image must be below 1024x1024.
                        </p>
                        <p className="text-xs font-medium text-gray-500">
                            User PNG,JPG, or BMP format
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 bg-stone-50 p-4 rounded-lg">
                    {
                        Object.keys(fieldMap).map((key) => {
                            const field = key as KeysUserData

                            return (
                                <div className="flex flex-col">
                                    <div className="flex flex-row items-center justify-between">
                                        <Label className="text-nowrap text-sm text-gray-500 font-semibold">
                                            {fieldMap[key as keyof typeof fieldMap]}
                                        </Label>
                                        <Input
                                            type="text"
                                            name={field}
                                            className="w-full bg-white border-solid border-2 h-10 p-2 w-96 rounded-lg"
                                            value={userValues.firstName}
                                            onBlur={formData.handleBlur}
                                            onChange={(e) => formData.setFieldValue(field, e.target.value)}
                                        />
                                    </div>
                                    {
                                        formData.touched[field] && formData.errors[field] ? (
                                            <p className="text-xs text-rose-700">{formData.errors[field]}</p>
                                        ) : null
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                    <hr />
                    <div className='flex justify-end px-8'>
                        <Button
                            className='w-24 h-10 mt-4 bg-purple-600 text-white font-semibold'
                            onClick={formData.submitForm}
                        >
                            Save
                        </Button>
                    </div>
            </div>
        </div>
    )
}