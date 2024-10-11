'use client'

import { useMemo } from "react"
import useWindowSize from "./useWindowSize"

const useResponsive = () => {
    const { width } = useWindowSize()
    const { fullWidth, inputStyle, showIconsOnly, isMobile } = useMemo(
		() => {
			const wrapText = (width < 1000 && width > 750) || width < 600
			const fullWidth = width < 750
            const inputStyle = wrapText ? 'flex-col' : 'flex-row'
            
            const showIconsOnly = width < 800

            const isMobile = width < 600

            return {
                isMobile,
				fullWidth,
                inputStyle,
                showIconsOnly
			}
		},
		[width]
    )
    
    return { fullWidth, inputStyle, showIconsOnly, isMobile }
}


export default useResponsive