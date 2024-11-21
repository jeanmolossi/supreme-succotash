'use client'

import { Input, Label, toast } from '@local/ui'
import { NextButton } from '../../next-button'
import useBankAccounts from '@/lib/swr/use-bank-accounts'
import { useEffect } from 'react'
import { LoaderCircle } from 'lucide-react'

export default function FirstTransactionForm() {
	const { error, bankAccounts, loading } = useBankAccounts()

	useEffect(() => {
		if (error) {
			toast.error('Falhou ao recuperar as contas')
			console.error(error)
		}
	}, [error])

	return (
		<div className="flex flex-col w-full max-w-screen-sm gap-2 p-4 bg-white/40 border rounded-md">
			<div className="flex flex-col w-full gap-2">
				<Label>Conta</Label>

				{loading && (
					<small className="flex gap-2 items-center max-w-[300px]">
						<LoaderCircle className="animate-spin" />
						Carregando suas contas...
					</small>
				)}

				<div className="grid grid-cols-3 gap-4 mb-4">
					{bankAccounts?.result.map(bankAccount => (
						<div className="flex items-center gap-2">
							<Input
								id={bankAccount.id}
								type="radio"
								name="bank"
								placeholder="ex: Bradesco"
								value={bankAccount.id}
								className="w-4 h-4"
							/>
							<Label htmlFor={bankAccount.id}>
								{bankAccount.name}
							</Label>
						</div>
					))}
				</div>

				<Label>Tipo de transação</Label>
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div className="flex items-center gap-2">
						<Input
							type="radio"
							id="income"
							className="w-4"
							name="tx-type"
						/>
						<Label htmlFor="income">Entrada</Label>
					</div>

					<div className="flex items-center gap-2">
						<Input
							type="radio"
							id="outcome"
							className="w-4"
							name="tx-type"
						/>
						<Label htmlFor="outcome">Saida</Label>
					</div>
				</div>

				<Label>Valor de transação</Label>
				<Input placeholder="ex: R$ 139,99" />
			</div>

			<hr className="w-96 my-4" />
			<NextButton disabled={loading} step="finalizado">
				Salvar e finalizar
			</NextButton>
		</div>
	)
}
