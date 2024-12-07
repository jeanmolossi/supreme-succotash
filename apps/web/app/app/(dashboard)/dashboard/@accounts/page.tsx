import { fetchAccountBalance } from '@/lib/api/fetchers/fetch-account-balance'
import { BankAccountBalance } from '@/lib/types/entities/bank-account'

function RenderAccount({ account }: { account: BankAccountBalance }) {
	return (
		<div
			key={account.bank_account_id}
			className="grid grid-cols-2 gap-2 border-b py-1 mt-1"
		>
			<span className="text-sm">{account.bank_account.name}</span>
			<span className="text-right font-normal text-green-600">
				{account.account_balance.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}
			</span>
		</div>
	)
}

export default async function AccountsPage() {
	const accountBalances = await fetchAccountBalance()
	const familyBalance = accountBalances.at(0)

	return (
		<div className="grid grid-cols-1 gap-2 border p-2 rounded">
			<span className="font-medium">Saldo estimado em suas contas</span>

			{accountBalances.map(accBalance => (
				<RenderAccount
					key={accBalance.bank_account_id}
					account={accBalance}
				/>
			))}

			<div className="grid grid-cols-2 gap-2 border-b py-1 mt-1">
				<span className="text-sm font-medium">Total na familia</span>

				<span className="text-right font-normal text-green-600">
					{familyBalance?.family_balance.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					}) || 'R$ 0,00'}
				</span>
			</div>
		</div>
	)
}
