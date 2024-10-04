export interface User {
	_id?: string
	name: string
	age: string
	address: string
	email: string
	lastLogin?: Date
}

export interface Admin {
	_id?: string
	name: string
	age: string
	address: string
	email: string
	lastLogin?: Date
}

export interface LoginCredentials {
	email: string
	password: string
}
