import Link from "next/link"
import { Edit } from "lucide-react"
import { Transaction } from "@/lib/types/entities/transaction"
import { Category } from "@/lib/types/entities/category"
import { BankAccount } from "@/lib/types/entities/bank-account"

type WithCategory = { category: Category }
type WithBankAccount = { bank_account: BankAccount }

interface CreditProps {
	transaction: Transaction & WithCategory & WithBankAccount
}

export default function Credit({ transaction }: CreditProps) {
	const transactedAt = new Date(transaction.transacted_at)
	const transactedAtString = `${transactedAt.toLocaleString('pt-BR')}`

	return (
		<div className="border rounded p-2 grid animate-slide-up-fade [animation-delay:250ms] [animation-duration:1s] [animation-fill-mode:both]">
			<small className="text-xs text-muted-foreground my-2">
				{transactedAtString}
			</small>

			<div className="grid grid-cols-2 items-baseline">
				<div className="grid gap-2">
					<span className="text-sm">{transaction.description}</span>
					<small className="text-xs text-muted-foreground">Categoria {transaction.category.name} via cartão {transaction.bank_account.name}</small>
				</div>

				<div className="grid place-items-end gap-2">
					<Link
						href={`/transaction?id=${transaction.id}`}
						className={'text-gray-600 font-medium text-right'}
					>
						- {transaction.amount.toLocaleString('pt-BR', {
							currency: 'BRL',
							style: 'currency',
						})}

						<Edit size={16} className="inline ml-4" />
					</Link>

					<span className="text-xs uppercase font-semibold text-muted-foreground">Crédito</span>
				</div>
			</div>
		</div >
	)
}
