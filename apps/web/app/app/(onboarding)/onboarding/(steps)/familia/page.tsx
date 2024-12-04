import { Suspense } from 'react'
import { LaterButton } from '../../later-button'
import { NextButton } from '../../next-button'
import JoinFamilyForm from './form'

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

			<JoinFamilyForm invite={search['family-invite']} />

			<p>
				Se não possui um código de família, ou, quer iniciar uma família
				escolha como deseja prosseguir abaixo
			</p>

			<Suspense>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
					<LaterButton step="contas" />

					<NextButton step="contas">
						Continuar configuração da conta
					</NextButton>
				</div>
			</Suspense>
		</div>
	)
}
