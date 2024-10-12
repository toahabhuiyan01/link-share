export type ILink = {
    name: string /*'Github' | 'YouTube' | 'Twitter' | 'LinkedIn' | 'Instagram' | 'Facebook' | 'GitLab' | 'Bitbucket' */
    url: string
    id: string
}

export type IView = 'Links' | 'Profile Details'

export type IUser = {
    _id: string
    firstName: string
    lastName: string
    email?: string
    avatar?: string
    links?: ILink[]
}