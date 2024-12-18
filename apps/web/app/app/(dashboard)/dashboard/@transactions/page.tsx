import { fetchTransactions } from '@/lib/api/fetchers/fetch-transactions'
import { Transaction } from '@/lib/types/entities/transaction'
import { cn } from '@local/utils'

function RenderTransaction({ transaction }: { transaction: Transaction }) {
	const transactedAt = new Date(transaction.transacted_at).toLocaleDateString(
		'pt-BR',
	)
	return (
		<div className="grid grid-cols-2 border-b py-1 mt-1 animate-slide-up-fade [animation-delay:250ms] [animation-duration:1s] [animation-fill-mode:both]">
			<div className="grid grid-cols-2 items-baseline gap-2">
				<span className="text-sm">{transaction.description}</span>
				<small className="text-xs text-muted-foreground">
					{transactedAt}
				</small>
			</div>
			<span
				className={cn(
					transaction.type === 'income'
						? 'text-green-600'
						: 'text-destructive',
					'font-medium text-right',
				)}
			>
				{transaction.type === 'income' ? '+ ' : '- '}
				{transaction.amount.toLocaleString('pt-BR', {
					currency: 'BRL',
					style: 'currency',
				})}
			</span>
		</div>
	)
}

export default async function TransactionPage() {
	const { total, transactions } = await fetchTransactions()

	return (
		<div className="flex flex-col border p-2 rounded">
			<span className="font-semibold my-2 animate-slide-up-fade [animation-delay:250ms] [animation-duration:1s] [animation-fill-mode:both]">
				Você tem {total} transações
			</span>

			{transactions.map(transaction => (
				<RenderTransaction
					key={transaction.id}
					transaction={transaction}
				/>
			))}
		</div>
	)
}
