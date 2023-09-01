'use client'

import L, { Map as MapContainerType } from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

import { getLocationFromCoords } from '@/actions/location'
import { cn } from '@/lib/utils'
import { Location } from '@/types'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon.src,
	iconRetinaUrl: markerIcon2x.src,
	shadowUrl: markerShadow.src,
})

interface Props {
	className?: string
	location?: Location
	onChange: (location: Location) => void
}

const defaultPosition = {
	lat: 51.5074,
	lng: -0.1278,
}

export const Map = ({ className, location, onChange }: Props) => {
	const [position, setPosition] = useState<L.LatLng | null>(null)
	const map = useRef<null | MapContainerType>(null)

	const GetLatLng = () => {
		useMapEvents({
			click(e) {
				setPosition(e.latlng)
				getAddressFromGeolocation(e.latlng)

				map.current?.setView(e.latlng)
			},
		})
		return null
	}

	const getAddressFromGeolocation = async (position: L.LatLng) => {
		const response = await getLocationFromCoords({ lat: position.lat, lng: position.lng })

		onChange({
			latitude: position.lat,
			longitude: position.lng,
			city: (response.address.city || response.address.town || response.address.village) as string,
		})
	}

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const latlng = new L.LatLng(position.coords.latitude, position.coords.longitude)
				setPosition(latlng)
				getAddressFromGeolocation(latlng)
			},
			() => setPosition(new L.LatLng(defaultPosition.lat, defaultPosition.lng))
		)
	}, [])

	return (
		<div className={cn(className)}>
			{position && (
				<MapContainer ref={map} className='h-[300px]' center={position} zoom={13} scrollWheelZoom={false}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
					<Marker position={position} />
					<GetLatLng />
				</MapContainer>
			)}
		</div>
	)
}
