import { fetchAccountBalance } from '@/lib/api/fetchers/fetch-account-balance'

export default async function AccountsPage() {
	const accountBalances = await fetchAccountBalance()

	return (
		<div className="grid grid-cols-1 gap-2 border p-2 rounded">
			<span className="font-medium">Saldo estimado em suas contas</span>

			{accountBalances.map(accBalance => (
				<div
					key={accBalance.bank_account_id}
					className="grid grid-cols-2 gap-2 border-b py-1 mt-1"
				>
					<span className="text-sm">
						{accBalance.bank_account.name}
					</span>
					<span className="text-right font-normal text-green-600">
						{accBalance.account_balance.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</span>
				</div>
			))}
		</div>
	)
}
