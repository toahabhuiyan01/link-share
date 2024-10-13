'use client'

import { create } from 'zustand'
import { IUser, IView } from '../types'

type LinkStore = {
    userData?: IUser
    selectedView: IView
    setSelectedView: (view: IView) => void
    setUserData: (data: IUser) => void
    loading: boolean
    setLoading: (loading: boolean) => void
}

const useLinkStore = create<LinkStore>((set) => ({
    loading: false,
    setLoading: (loading) => set({ loading }),
	selectedView: 'Links',
	setSelectedView: (view) => set({ selectedView: view }),
    setUserData: (data: IUser) => set(state => ({ userData: { ...state.userData, ...data } })),

}))

export default useLinkStore