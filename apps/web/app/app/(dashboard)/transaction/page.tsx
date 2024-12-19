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

async function getTransaction(transactionID: string) {
	return await fetch(`${API_DOMAIN}/transactions/${transactionID}`)
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

interface TransactionPageProps {
	searchParams: Promise<{
		id?: string
	}>
}

export default async function TransactionPage({
	searchParams,
}: TransactionPageProps) {
	const { id } = await searchParams

	const user = await getLoggedUser()
	const promises = [
		getFamilyAccounts(user.family_id),
		getFamilyCategories(user.family_id),
	]

	if (id) {
		promises.push(getTransaction(id))
	}

	const [bankAccounts, categories, transaction] = await Promise.all(promises)

	return (
		<div>
			<h1 className="text-lg font-semibold">
				{!id ? 'Adicione' : 'Ajuste'} uma nova transação
			</h1>

			<NewTransactionForm
				bankAccounts={bankAccounts}
				categories={groupCategories(categories)}
				transaction={transaction}
			/>
		</div>
	)
}
