import { Timestamps } from './base'

interface BaseCategory {
	id: string
	name: string
	parent_id: string
	user_id: string
	family_id: string
}

export interface Category extends BaseCategory, Timestamps {}
