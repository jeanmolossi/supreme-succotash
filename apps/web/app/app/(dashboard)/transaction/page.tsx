import NewTransactionForm from './form'
import { groupCategories } from './parsers'
import { fetchTransaction } from '@/lib/api/fetchers/fetch-transactions'
import { fetchAccounts } from '@/lib/api/fetchers/fetch-account-balance'
import { fetchCategories } from '@/lib/api/fetchers/fetch-categories'

interface TransactionPageProps {
	searchParams: Promise<{
		id?: string
	}>
}

export default async function TransactionPage({
	searchParams,
}: TransactionPageProps) {
	const promises = [fetchAccounts(), fetchCategories()]

	const { id } = await searchParams
	if (id) {
		promises.push(fetchTransaction(id))
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
