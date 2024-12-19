import { API_DOMAIN } from '@local/utils'
import { authFetch } from './auth-fetch'

export async function fetchCategories() {
	return await authFetch(`${API_DOMAIN}/categories`).then(res => res.json())
}
