import { Transaction } from '@/lib/types/entities/transaction'
import { API_DOMAIN } from '@local/utils'
import { authFetch } from './auth-fetch'

interface TransactionFilters {
	category_id?: string
}

export async function fetchTransactions({ category_id }: TransactionFilters) {
	let query = ''
	const searchParams = new URLSearchParams()
	if (category_id) {
		searchParams.append('category_id', category_id)
	}

	if (searchParams.size > 0) {
		query = `?${searchParams.toString()}`
	}

	const transactions = await authFetch(`${API_DOMAIN}/transactions${query}`)
		.then(async res => {
			if (!res.ok) {
				console.error('Get transactions was not Ok', await res.text())
				return {
					total: 0,
					transactions: [],
				}
			}

			return res.json()
		})
		.catch(err => {
			console.error('Failed to get transactions', err)
			return {
				total: 0,
				transactions: [],
			}
		})

	return transactions as {
		total: number
		transactions: Transaction[]
	}
}

export async function fetchTransaction(transactionID: string): Promise<Transaction> {
	return await authFetch(`${API_DOMAIN}/transactions/${transactionID}`)
		.then(async res => {
			if (!res.ok) {
				console.error(
					'Failed to retrieve transaction',
					await res.text(),
				)
				return null
			}

			return res.json()
		})
		.catch(err => {
			console.error('Failed to fetch transaction', err)
			return null
		})
}
