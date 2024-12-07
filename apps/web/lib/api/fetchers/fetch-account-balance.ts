import { getLoggedUser } from '@/lib/auth/helpers'
import { BankAccountBalance } from '@/lib/types/entities/bank-account'
import { API_DOMAIN } from '@local/utils'

export async function fetchAccountBalance() {
	const user = await getLoggedUser()
	const query = new URLSearchParams({
		family_id: user.family_id,
	})

	const accountBalances = await fetch(
		`${API_DOMAIN}/bank-accounts/balances?${query.toString()}`,
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
