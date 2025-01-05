import { API_DOMAIN } from '@local/utils'
import { authFetch } from './auth-fetch'
import { Category } from '@/lib/types/entities/category'

export async function fetchCategories(): Promise<Category[]> {
	return await authFetch(`${API_DOMAIN}/categories`).then(res => res.json())
}
