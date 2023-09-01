export interface SignInProps {
	email: string
	password: string
}

export interface SignUpProps {
	email: string
	username: string
	password: string
}

export interface User {
	userId: number
	email: string
	username: string
	userRole: string
}

export interface Post {
	name: string
	gender: string
	age: number
	breed: string
	images: string[]
	description: string
	location: Location
	createdAt: string
}

export type PostWithUserDetails = Post & {
	id: number
	userFirstName: string
	userLastName: string
	userMobilePhone: string
	userId: number
}

export interface Location {
	latitude: number
	longitude: number
	city: string
}

export type UserDetails = {
	username: string
	email: string
	firstName: string | null
	lastName: string | null
	mobile: string | null
}
