export function getContrastTextColor(backgroundColor: string) {
	// Convert hex color to RGB
	const hexToRgb = (hex: string) => {
		const bigint = parseInt(hex.replace('#', ''), 16)
		return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255]
	}

	// Calculate relative luminance
	const rgb = hexToRgb(backgroundColor)
	const luminance = 0.2126 * rgb[0] / 255 + 0.7152 * rgb[1] / 255 + 0.0722 * rgb[2] / 255

	// Determine text color based on luminance
	return luminance > 0.5 ? '#000000' : '#FFFFFF' // Black for light backgrounds, white for dark backgrounds
}