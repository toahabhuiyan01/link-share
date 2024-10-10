'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ILink } from '../../../types'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { closestCorners, DndContext, DragEndEvent, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { GripHorizontal } from 'lucide-react'
import { platformTheme } from '../constants'
import useLinkStore from '@/app/store/LinkStore'

type LinkProps = {
    links?: ILink[]
}

const SOCILE_MEDIA = Object.keys(platformTheme)

function Link({ links }: LinkProps) {
    const { userData, setUserData } = useLinkStore()
    const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

    const boardForm = useFormik<{ links: ILink[] }>({
		initialValues: { links: links || [] },
		validateOnBlur: true,
		onSubmit: async(values) => {
			setUserData({
                firstName: 'toaha',
                lastName: 'bhuiyan',
                email: 'toahabhuiyan@gmail.com',
                links: values.links 
            })
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
            className='flex flex-col bg-white rounded-lg'
            style={{
                width: 'calc(60% - .5rem)'
            }}
        >
            <div
                className='flex flex-col gap-4 p-8 bg-white rounded-lg'
            >
                <div className='flex flex-col gap-1'>
                    <p className='text-3xl font-extrabold'>Customize your links</p>
                    <p className='text-sm font-medium text-gray-600'>Add/edit/remove links below and then share all your profiles with the world!</p>
                </div>

                <Button
                    variant='outline'
                    className='w-full border-solid border-2 h-10 border-purple-800 text-purple-600 font-semibold'
                    onClick={
                        () => {
                            boardForm.setValues(values => ({ links: [...values.links, { id: getRandomString(), name: '', url: '' }] }))
                        }
                    }
                >
                    + Add new link
                </Button>

                <div
                    className='flex flex-col gap-4 overflowY-scroll'
                    style={{
                        maxHeight: 'calc(100vh - 25nerem) !important',
                        height: 'calc(100vh - 25rem)',
                        overflowY: 'scroll'
                    }}
                >
                    <DndContext
                        sensors={sensors} 
                        collisionDetection={closestCorners}
                        onDragEnd={
                            ({ active, over }: DragEndEvent) => {
                                if(active.id === over?.id) {
                                    return
                                }

                                boardForm.setValues(prev => {
                                    const newPrev = { ...prev }

                                    const draggeditem = newPrev.links.splice(active.id as number, 1)[0]
                                    newPrev.links.splice(+(over?.id || 0), 0, draggeditem)

                                    return newPrev
                                })
                            }
                        }
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
                                            key={link.id}
                                            link={link}
                                            index={index}
                                            errors={boardForm.errors.links?.[index]}
                                            touched={boardForm.touched.links?.[index]}
                                            handleChange={boardForm.setFieldValue}
                                            onBlur={boardForm.handleBlur}
                                            onRemoveLink={() => {
                                                boardForm.setValues(values => ({ links: values.links.filter((_, i) => i !== index) }))
                                            }}
                                        />
                                    ))
                                }
                                </SortableContext>
                            ) : (
                                <div className='flex justify-center h-full items-center'>
                                    <p className='text-gray-500 text-base font-semibold'>No links added</p>
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
                        className='w-24 h-10 mt-4 bg-purple-600 text-white font-semibold'
                        onClick={boardForm.submitForm}
                    >
                        Save
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

    return (
    <div
        key={link.name}
        ref={setNodeRef}
        className='flex flex-col gap-2 bg-stone-50 rounded-lg'
        style={{
            padding: '1rem',
            transform: CSS.Transform.toString(transform),
            transition
        }}
    >
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row items-center gap-2'>
                <GripHorizontal
                    {...attributes}
                    {...listeners}
                    style={{ cursor: 'grab', width: '1.25rem' }} 
                />
                <p className='text-gray-500 text-base font-semibold'>
                    Link #{index + 1}
                </p>
            </div>
            <Button
                variant='ghost'
                onClick={onRemoveLink}
                className='text-gray-500 font-medium text-sm'
            >
                Remove
            </Button>
        </div>
        <div
        >
            <Label>Platform</Label>
            <Select
                value={link.name}
                onValueChange={val => {
                    handleChange(`links[${index}].name`, val)
                }}
                onOpenChange={isOpen => !isOpen && onBlur({ target: { name: `links[${index}].name`, value: link.name } } as any)}
            >
                <SelectTrigger
                    style={{
                        height: '2.5rem',
                        backgroundColor: 'white'
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
                                    // disabled={formLinks.some((value, i) => value.name === item)}
                                >
                                    {item}
                                </SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
            {
                // @ts-ignore
                touched?.name && ('name' in errors && errors.name) ? (
                    <p className="text-xs text-rose-700">{errors.name}</p>
                ) : null
            }
        </div>

        <div>
            <Label>Link</Label>
            <Input
                type="text"
                name={`links[${index}].url`}
                value={link.url}
                style={{
                    height: '2.5rem',
                }}
                className='bg-white'
                onBlur={e => onBlur(e)}
                onChange={e => {
                    handleChange(`links[${index}].url`, e.target.value)
                }}
            />

            {
                // @ts-ignore
                touched?.url && ('url' in errors && errors.url) ? (
                    <p className="text-xs text-rose-700">{errors.url}</p>
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