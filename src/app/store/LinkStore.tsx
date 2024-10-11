'use client'

import { create } from 'zustand'
import { IUser, IView } from '../types'
import axios from 'axios'
import { NextResponse } from 'next/server'

type LinkStore = {
    userData?: IUser
    selectedView: IView
    setSelectedView: (view: IView) => void
    setUserData: (data: IUser) => void
    fetchAndSetUserData: (id: string) => void
    loading: boolean
    setLoading: (loading: boolean) => void
}

const useLinkStore = create<LinkStore>((set) => ({
    loading: false,
    setLoading: (loading) => set({ loading }),
	selectedView: 'Links',
	setSelectedView: (view) => set({ selectedView: view }),
    setUserData: (data: IUser) => set(state => ({ userData: { ...state.userData, ...data } })),
    fetchAndSetUserData: async (id: string) => {
        set({ loading: true })
        try {
            const data = (await axios('/api/user', { params: { id } })).data
            set({ userData: data, loading: false })
        } catch(error) {
            console.log(error)
            set({ loading: false })
            NextResponse.redirect(new URL('/'))
        }
    }

}))

export default useLinkStore