'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ILink } from '../../../types'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

type LinkProps = {
    links?: ILink[]
}

const SOCILE_MEDIA = ['Github', 'YouTube', 'Twitter', 'LinkedIn', 'Instagram', 'Facebook', 'GitLab', 'Bitbucket']

function Link({ links }: LinkProps) {
    const boardForm = useFormik<{ links: ILink[] }>({
		initialValues: { links: links || [] },
		validateOnBlur: true,
		onSubmit: async(values) => {
			console.log(values)
		},
		validationSchema: Yup.object().shape({
            links: Yup.array().of(
                Yup.object().shape({
                    name: Yup.string().trim().required('Select a Social Media'),
                    url: Yup.string().trim().required('URL is required').url('This need to be a valid URL')
                })
            ).min(1)
        })
	})

    const formLinks = boardForm.values.links

    return (
        <div
            className='flex flex-col gap-4 p-4 bg-white rounded-lg'
            style={{
                width: '60%'
            }}
        >
            <h2>Customize your links</h2>
            <p>Add/edit/remove links below and tehn share all your profiles with the world!</p>

            <Button
                variant='outline'
                className='w-full border-solid border-2 h-10'
                onClick={
                    () => {
                        boardForm.setValues(values => ({links: [...values.links, { name: '', url: '' }] }))
                    }
                }
            >
                + Add new link
            </Button>

            {
                formLinks.map((link, index) => (
                    <div
                        key={link.name}
                        className='flex flex-col gap-2 bg-stone-50 rounded-lg'
                        style={{
                            padding: '1rem',
                        }}
                    >
                        <div
                        >
                            <Label>Platform</Label>
                            <Select
                                value={link.name}
                                onValueChange={val => {
                                    boardForm.setFieldValue(`links[${index}].name`, val)
                                }}
                            >
                                <SelectTrigger
                                    style={{
                                        height: '2.5rem'
                                    }}
                                >
                                    <SelectValue placeholder="Select a Platfrom" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Platform</SelectLabel>
                                        {
                                            SOCILE_MEDIA.map((item) => (
                                                <SelectItem
                                                    key={item} 
                                                    value={item}
                                                    disabled={formLinks.some((value, i) => value.name === item)}
                                                >
                                                    {item}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Link</Label>
                            <Input
                                type="text"
                                value={link.url}
                                style={{
                                    height: '2.5rem',
                                }}
                                onChange={e => {
                                    boardForm.setFieldValue(`links[${index}].url`, e.target.value)
                                }}
                            />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Link