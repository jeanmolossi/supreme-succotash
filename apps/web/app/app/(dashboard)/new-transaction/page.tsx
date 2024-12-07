import { API_DOMAIN } from '@local/utils'
import NewTransactionForm from './form'
import { getLoggedUser } from '@/lib/auth/helpers'
import { groupCategories } from './parsers'

async function getFamilyAccounts(familyID: string) {
	return await fetch(
		`${API_DOMAIN}/bank-accounts?family_id=${familyID}`,
	).then(res => res.json())
}

async function getFamilyCategories(familyID: string) {
	return await fetch(`${API_DOMAIN}/categories?family_id=${familyID}`).then(
		res => res.json(),
	)
}

export default async function NewTransactionPage() {
	const user = await getLoggedUser()
	const [bankAccounts, categories] = await Promise.all([
		getFamilyAccounts(user.family_id),
		getFamilyCategories(user.family_id),
	])

	return (
		<div>
			<h1 className="text-lg font-semibold">
				Adicione uma nova transação
			</h1>

			<NewTransactionForm
				bankAccounts={bankAccounts}
				categories={groupCategories(categories)}
			/>
		</div>
	)
}
