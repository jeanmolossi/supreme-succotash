import Credit from '@/components/transactions/credit'
import Income from '@/components/transactions/income'
import Outcome from '@/components/transactions/outcome'
import { fetchAccounts } from '@/lib/api/fetchers/fetch-account-balance'
import { fetchCategories } from '@/lib/api/fetchers/fetch-categories'
import { fetchTransactions } from '@/lib/api/fetchers/fetch-transactions'
import { BankAccount } from '@/lib/types/entities/bank-account'
import { Category } from '@/lib/types/entities/category'
import { Transaction } from '@/lib/types/entities/transaction'

const transactionComponent = {
	'credit': Credit,
	'outcome': Outcome,
	'income': Income,
}

type WithCategory = { category: Category }
type WithBankAccount = { bank_account: BankAccount }

function RenderTransaction({ transaction }: { transaction: Transaction & WithCategory & WithBankAccount }) {
	const Component = transactionComponent[transaction.type]

	if (!Component) {
		return (
			<div>Tipo de transação não identificada</div>
		)
	}

	return <Component transaction={transaction} />
}

interface TransactionsPageProps {
	searchParams?: Promise<{
		category_id?: string;
	}>
}

export default async function TransactionPage({ searchParams }: TransactionsPageProps) {
	const urlSearchParams = await searchParams || {}
	const { category_id } = urlSearchParams

	const [{ total, transactions }, categories, accounts] = await Promise.all([
		fetchTransactions({ category_id }),
		fetchCategories(),
		fetchAccounts(),
	])

	const categoryMap = new Map(
		categories.map(category => [category.id, category])
	)

	const accountMap = new Map(
		accounts.map(account => [account.id, account])
	)

	const mappedTransactions: Array<Transaction & WithCategory & WithBankAccount> = transactions.map(
		transaction => ({
			...transaction,
			category: categoryMap.get(transaction.category_id)!,
			bank_account: accountMap.get(transaction.bank_account_id)!
		})
	)

	return (
		<div className="flex flex-col border p-2 rounded gap-2">
			<span className="font-semibold my-2 animate-slide-up-fade [animation-delay:250ms] [animation-duration:1s] [animation-fill-mode:both]">
				Você tem {total} transações
			</span>

			{mappedTransactions.map(transaction => (
				<RenderTransaction
					key={transaction.id}
					transaction={transaction}
				/>
			))}
		</div>
	)
}
