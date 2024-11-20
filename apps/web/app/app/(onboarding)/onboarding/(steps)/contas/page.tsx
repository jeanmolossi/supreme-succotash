import { NextButton } from '../../next-button'
import Accounts from './accounts'

export default function Page() {
	return (
		<div className="flex flex-col gap-4 items-center max-w-screen-sm">
			<h1 className="animate-slide-up-fade mt-10 text-2xl font-medium [--offset:10px] [animation-delay:250ms] [animation-duration:1s] [animation-fill-mode:both]">
				Configuração de contas
			</h1>

			<p>Quais contas você possui?</p>

			<Accounts />

			<NextButton step="finalizado" variant="secondary">
				Adicionar depois
			</NextButton>
		</div>
	)
}
