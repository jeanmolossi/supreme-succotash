import { getLoggedUser } from '@/lib/auth/helpers'
import { Transaction } from '@/lib/types/entities/transaction'
import { API_DOMAIN } from '@local/utils'
import { redirect } from 'next/navigation'

export async function fetchTransactions() {
	const user = await getLoggedUser()
	if (!user) {
		redirect('/')
	}

	const query = new URLSearchParams({
		family_id: user.family_id,
	})

	const transactions = await fetch(
		`${API_DOMAIN}/transactions?${query.toString()}`,
	)
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
