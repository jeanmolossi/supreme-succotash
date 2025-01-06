import { API_DOMAIN } from '@local/utils'
import { authFetch } from './auth-fetch'
import { Category } from '@/lib/types/entities/category'

export async function fetchCategories(): Promise<Category[]> {
	return await authFetch(`${API_DOMAIN}/categories`).then(res => res.json())
}

export async function fetchExpenses(): Promise<{
	expenses: Array<{
		category: string;
		category_id: string;
		total: number;
	}>;
	meta: { total: number; }
}> {
	return await authFetch(`${API_DOMAIN}/dashboard/expenses`).then(res => res.json())
}
