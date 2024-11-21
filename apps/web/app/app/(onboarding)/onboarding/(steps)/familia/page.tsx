import { LaterButton } from '../../later-button'
import { NextButton } from '../../next-button'
import { Input, Label } from '@local/ui'

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ 'family-invite': string }>
}) {
	const search = await searchParams

	return (
		<div className="flex flex-col gap-4 items-center max-w-screen-sm">
			<h1 className="animate-slide-up-fade mt-10 text-2xl font-medium [--offset:10px] [animation-delay:250ms] [animation-duration:1s] [animation-fill-mode:both]">
				Configuração de família
			</h1>

			<p>Você possui um código de família ?</p>

			<div className="flex flex-col w-full gap-1">
				<Label>Código de família</Label>
				<Input
					placeholder="ex: abe53d09-88ba-08a7-afa8-56fafbb5abf0"
					value={search['family-invite']}
				/>
			</div>

			<LaterButton step="finish" variant="default">
				Entrar na família
			</LaterButton>

			<p>
				Se não possui um código de família, ou, quer iniciar uma família
				escolha como deseja prosseguir abaixo
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
				<LaterButton step="contas" />

				<NextButton step="contas">
					Continuar configuração da conta
				</NextButton>
			</div>
		</div>
	)
}
