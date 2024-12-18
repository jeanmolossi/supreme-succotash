import { Suspense } from 'react'
import { LaterButton } from '../../later-button'
import FirstTransactionForm from './form'
import { API_DOMAIN } from '@local/utils'
import { getLoggedUser } from '@/lib/auth/helpers'

export default async function Page() {
	const user = await getLoggedUser()

	const bankAccounts = await fetch(
		`${API_DOMAIN}/bank-accounts?family_id=${user.family_id}`,
	).then(res => res.json())

	return (
		<div className="flex flex-col gap-4 items-center max-w-screen-sm">
			<h1 className="animate-slide-up-fade mt-10 text-2xl font-medium [--offset:10px] [animation-delay:250ms] [animation-duration:1s] [animation-fill-mode:both]">
				Primeira transação
			</h1>

			<Suspense>
				<FirstTransactionForm bankAccounts={bankAccounts} />
			</Suspense>

			<div className="grid grid-cols-1 items-center gap-2">
				<Suspense>
					<LaterButton step="finish">
						Não, quero fazer isso depois
					</LaterButton>
				</Suspense>
			</div>
		</div>
	)
}
