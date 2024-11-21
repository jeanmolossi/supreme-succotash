import { LaterButton } from '../../later-button'
import FirstTransactionForm from './form'

export default async function Page() {
	return (
		<div className="flex flex-col gap-4 items-center max-w-screen-sm">
			<h1 className="animate-slide-up-fade mt-10 text-2xl font-medium [--offset:10px] [animation-delay:250ms] [animation-duration:1s] [animation-fill-mode:both]">
				Primeira transação
			</h1>

			<FirstTransactionForm />

			<div className="grid grid-cols-1 items-center gap-2">
				<LaterButton step="finish">
					Não, quero fazer isso depois
				</LaterButton>
			</div>
		</div>
	)
}
