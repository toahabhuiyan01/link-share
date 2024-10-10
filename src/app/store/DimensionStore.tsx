'use client'

import { create } from 'zustand'

type DimensionStoreType = {
    dimansion: {
        width: number
        height: number
    }
    subscribe: () => void
}

const useDimensionStore = create<DimensionStoreType>((set) => ({
	dimansion: {
		width: window.innerWidth,
		height: window.innerHeight
	},
	subscribe: () => {
		window.addEventListener('resize', () => {
			set({
				dimansion: {
					width: window.innerWidth,
					height: window.innerHeight
				}
			})
		})
	}
}))

export default useDimensionStore