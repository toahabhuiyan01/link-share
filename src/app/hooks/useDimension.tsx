'use client'

import useDimensionStore from "@/app/store/DimensionStore"
import { useMemo } from "react"

const useResponsive = () => {
    const { dimansion } = useDimensionStore()
    const { fullWidth, inputStyle, showIconsOnly, isMobile } = useMemo(
		() => {
			const wrapText = (dimansion.width < 1000 && dimansion.width > 750) || dimansion.width < 600
			const fullWidth = dimansion.width < 750
            const inputStyle = wrapText ? 'flex-col' : 'flex-row'
            
            const showIconsOnly = dimansion.width < 800

            const isMobile = dimansion.width < 600

            return {
                isMobile,
				fullWidth,
                inputStyle,
                showIconsOnly
			}
		},
		[dimansion.width]
    )
    
    return { fullWidth, inputStyle, showIconsOnly, isMobile }
}


export default useResponsive