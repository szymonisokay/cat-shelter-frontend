'use server'

import axios from 'axios'

interface LocationCoords {
	lat: number
	lng: number
}

export const getLocationFromCoords = async (position: LocationCoords) => {
	const endpoint = `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`

	const response = await axios.get<{
		address: {
			village?: string
			town?: string
			city?: string
		}
	}>(endpoint)

	return response.data
}
