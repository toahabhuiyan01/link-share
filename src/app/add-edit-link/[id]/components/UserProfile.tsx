import { IUser } from "@/app/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import Image from "next/image";
import * as Yup from 'yup'

type UserData = Pick<IUser, 'email' | 'avatar' | 'firstName' | 'lastName'>

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
            email: Yup.string().trim().required('Email is required').email('This need to be a valid email'),
            avatar: Yup.string().trim().required('Profile Picture is required'),
            firstName: Yup.string().trim().required('First Name is required'),
            lastName: Yup.string().trim().required('Last Name is required')
        })
    })

    const userValues = formData.values

    return (
        <div
            className='flex flex-col gap-4 p-4 bg-white rounded-lg'
            style={{
                width: '60%'
            }}
        >
            <div>
                <h1>Profile Details</h1>
                <p>
                    Add your details to create a personal touch to your profile
                </p>
            </div>
            <div
                className="flex flex-row justify-between items-center bg-stone-50 p-4 rounded-lg"
            >
                <Label>
                    Profile Picture
                </Label>
                <div style={{width: '100px'}}>
                    <AspectRatio
                        ratio={1/1}
                    >
                        <Image
                            id="profile-picture"
                            src="https://www.simplilearn.com/image-processing-article"
                            alt="Profile Picture"
                            width={100}
                            height={100}
                            onClick={
                                () => {
                                    const element = document.getElementById('file-input')
                                    element!.click()
                                }
                            }
                        />
                        
                        <input
                            id='file-input'
                            type="file"
                            className="hidden"
                            accept=".jpg, .png, .bmp" 
                        />
                    </AspectRatio>
                </div>
                <div className="flex flex-col">
                    <p>Image must be below 1024x1024.</p>
                    <p>User PNG,JPG, or BMP format</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 bg-stone-50 p-4 rounded-lg">
                <div className="flex flex-row items-center justify-between">
                    <Label className="text-nowrap">
                        First Name
                    </Label>
                    <input
                        type="text"
                        className="w-full border-solid border-2 h-10 p-2 w-80 rounded-lg"
                        value={userValues.firstName}
                        onChange={(e) => formData.setFieldValue('firstName', e.target.value)}
                    />
                    {
                        formData.touched.firstName && formData.errors.firstName ? (
                            <p>{formData.errors.firstName}</p>
                        ) : null
                    }
                </div>
                <div className="flex flex-row items-center justify-between">
                    <Label className="text-nowrap">
                        Last Name
                    </Label>
                    <input
                        type="text"
                        value={userValues.lastName}
                        className="w-full border-solid border-2 h-10 p-2 w-80 rounded-lg"
                        onChange={(e) => formData.setFieldValue('lastName', e.target.value)}
                    />
                    {
                        formData.touched.lastName && formData.errors.lastName ? (
                            <p>{formData.errors.lastName}</p>
                        ) : null
                    }
                </div>
                <div className="flex flex-row items-center justify-between">
                    <Label>
                        Email
                    </Label>
                    <input
                        type="email"
                        value={userValues.email}
                        className="w-full border-solid border-2 h-10 p-2 w-80 rounded-lg"
                        onChange={(e) => formData.setFieldValue('email', e.target.value)}
                    />
                    {
                        formData.touched.email && formData.errors.email ? (
                            <p>{formData.errors.email}</p>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}