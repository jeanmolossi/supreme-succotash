import { API_DOMAIN } from '@local/utils'
import { authFetch } from './auth-fetch'
import { Category } from '@/lib/types/entities/category'

interface CategoriesFilters {
	root_categories?: 0 | 1;
}

export async function fetchCategories(filters: CategoriesFilters = {}): Promise<Category[]> {
	const queryObj = new URLSearchParams({
		root_categories: `${filters.root_categories || 0}`
	})

	return await authFetch(`${API_DOMAIN}/categories?${queryObj.toString()}`).then(res => res.json())
}

interface ExpensesFilters {
	from?: Date;
	until?: Date;
	just_root_categories?: 0 | 1;
	category_id?: string;
}

interface Expense {
	category: string;
	category_id: string;
	total: number;
}

export interface ExpensesResponse {
	expenses: Array<Expense>;
	meta: {
		total: number;
		month: string;
	}
}

export async function fetchExpenses(filters: ExpensesFilters = {}): Promise<ExpensesResponse> {
	const queryObj = new URLSearchParams({
		just_root_categories: `${filters.just_root_categories || 0}`,
	})

	if (!!filters.from) {
		queryObj.append("from", filters.from.toISOString())
	}

	if (!!filters.until) {
		queryObj.append("until", filters.until.toISOString())
	}

	if (filters.category_id) {
		queryObj.append("category_id", filters.category_id)
	}

	return await authFetch(`${API_DOMAIN}/dashboard/expenses?${queryObj.toString()}`).then(res => res.json())
}
