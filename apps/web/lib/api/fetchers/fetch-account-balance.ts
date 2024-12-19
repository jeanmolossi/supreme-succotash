import { BankAccountBalance } from '@/lib/types/entities/bank-account'
import { API_DOMAIN } from '@local/utils'
import { authFetch } from './auth-fetch'

export async function fetchAccountBalance() {
	const accountBalances = await authFetch(
		`${API_DOMAIN}/bank-accounts/balances`,
	)
		.then(async res => {
			if (!res.ok) {
				console.error('Get account balances non ok', await res.text())
				return []
			}

			return res.json()
		})
		.catch(err => {
			console.error('Failed to get account balances', err)
			return []
		})

	return accountBalances as BankAccountBalance[]
}

export async function fetchAccounts() {
	return await authFetch(`${API_DOMAIN}/bank-accounts`).then(res =>
		res.json(),
	)
}
