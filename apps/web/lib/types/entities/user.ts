import { Timestamps } from './base'

interface BaseUser {
	id: string
	name: string
	email: string
	email_verified_at?: string
	source?: string
}

export interface CreateUser extends BaseUser {}

export interface User extends BaseUser, Timestamps {
	family_id: string
	email_verified_at: string
}
