import { Transaction } from '@/lib/types/entities/transaction'
import { API_DOMAIN } from '@local/utils'
import { authFetch } from './auth-fetch'

export async function fetchTransactions() {
	const transactions = await authFetch(`${API_DOMAIN}/transactions`)
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
