import { fetchAccounts } from '@/lib/api/fetchers/fetch-account-balance'
import TransferAmountsForm from './form'
import { fetchCategories } from '@/lib/api/fetchers/fetch-categories'

export default async function Page() {
	const [bankAccounts, categories] = await Promise.all([
		fetchAccounts(),
		fetchCategories(),
	])

	const noCategoryID = categories.find(category =>
		'Sem categoria'.includes(category.name),
	)?.id

	return (
		<div>
			<h1 className="text-lg font-semibold">Transferir entre contas</h1>

			<TransferAmountsForm
				bankAccounts={bankAccounts}
				category={noCategoryID || ''}
			/>
		</div>
	)
}
