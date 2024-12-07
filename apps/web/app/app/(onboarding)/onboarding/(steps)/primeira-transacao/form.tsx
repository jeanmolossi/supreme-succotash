'use client'

import { Button, Input, Label, toast } from '@local/ui'
import { BankAccount } from '@/lib/types/entities/bank-account'
import { useAction } from 'next-safe-action/hooks'
import { addTransactionAction } from '@/lib/actions/add-first-transaction-action'
import React, { useCallback, useState } from 'react'
import { useOnboardingProgress } from '../../use-onboarding-progress'
import { LoaderCircle } from 'lucide-react'

interface FirstTransactionFormProps {
	bankAccounts: BankAccount[]
}

export default function FirstTransactionForm({
	bankAccounts,
}: FirstTransactionFormProps) {
	const [bankAccount, setBankAccount] = useState('')
	const [txtype, setTxtype] = useState<'income' | 'outcome'>('outcome')
	const [amount, setAmount] = useState('')

	const { finish } = useOnboardingProgress()

	const { executeAsync, hasSucceeded, isExecuting } = useAction(
		addTransactionAction,
		{
			onSuccess: () => {
				console.log('Transaction added!')
			},
			onError: ({ error }) => {
				console.error(error)
				toast.error('Falha ao adicionar a transação, tente mais tarde')
			},
		},
	)

	const onSelectBankAccount = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setBankAccount(e.target.value)
		},
		[],
	)

	const onSelectTxType = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setTxtype(e.target.value as 'income' | 'outcome')
		},
		[],
	)

	const onChangeAmount = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value
			const formatted = formatCurrency(value)
			setAmount(formatted)
		},
		[],
	)

	const onContinue = useCallback(async () => {
		const result = await executeAsync({
			amount,
			type: txtype,
			bank_account_id: bankAccount,
		})

		if (result?.serverError?.serverError) {
			return
		}

		if (result?.validationErrors) {
			const messages = Object.values(result.validationErrors).reduce(
				(acc, current) => {
					if (
						current &&
						'_errors' in current &&
						current._errors!.length > 0
					) {
						// @ts-ignore
						acc.push(current._errors!.toString())
					}

					return acc
				},
				[],
			) as string[]

			messages.forEach(message => {
				toast.warning(message)
			})

			return
		}

		toast('Continuando...')

		await finish()
	}, [amount, bankAccount, txtype, executeAsync, finish])

	return (
		<div className="flex flex-col w-full max-w-screen-sm gap-2 p-4 bg-white/40 border rounded-md">
			<div className="flex flex-col w-full gap-2">
				<Label>Conta</Label>

				<div className="grid grid-cols-3 gap-4 mb-4">
					{bankAccounts?.map(bankAccount => (
						<div
							className="flex items-center gap-2"
							key={bankAccount.id}
						>
							<Input
								id={bankAccount.id}
								type="radio"
								name="bank"
								placeholder="ex: Bradesco"
								value={bankAccount.id}
								className="w-4 h-4"
								onChange={onSelectBankAccount}
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
							onChange={onSelectTxType}
							value="income"
						/>
						<Label htmlFor="income">Entrada</Label>
					</div>

					<div className="flex items-center gap-2">
						<Input
							type="radio"
							id="outcome"
							className="w-4"
							name="tx-type"
							onChange={onSelectTxType}
							value="outcome"
							defaultChecked
						/>
						<Label htmlFor="outcome">Saida</Label>
					</div>
				</div>

				<Label>Valor de transação</Label>
				<Input
					placeholder="ex: R$ 139,99"
					onChange={onChangeAmount}
					value={amount}
				/>
			</div>

			<hr className="w-96 my-4" />

			<Button onClick={onContinue} disabled={isExecuting || hasSucceeded}>
				{(isExecuting || hasSucceeded) && (
					<LoaderCircle className="animate-spin" />
				)}
				Salvar e finalizar
			</Button>
		</div>
	)
}

const formatCurrency = (value: string) => {
	if (!value) {
		return ''
	}

	const numericValue = value.replace(/\D/g, '')

	const formattedValue = (parseInt(numericValue) / 100).toLocaleString(
		'pt-BR',
		{
			style: 'currency',
			currency: 'BRL',
		},
	)

	return formattedValue
}
