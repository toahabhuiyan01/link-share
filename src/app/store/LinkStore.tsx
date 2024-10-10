import { create } from 'zustand'
import { IUser, IView } from '../types'

type LinkStore = {
    userData?: IUser
    selectedView: IView
    setSelectedView: (view: IView) => void
    setUserData: (data: IUser) => void
}

const useLinkStore = create<LinkStore>((set) => ({
  selectedView: 'Links',
  setSelectedView: (view) => set({ selectedView: view }),
  setUserData: (data: IUser) => set(state => ({ userData: { ...state.userData, ...data } })),
}))

export default useLinkStore