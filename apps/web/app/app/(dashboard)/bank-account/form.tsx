'use client'

import {
	Button,
	Input,
	Label,
	toast,
} from '@local/ui'
import React, { useCallback, useState } from 'react'
import { useAction } from 'next-safe-action/hooks'
import { LoaderCircle, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { formatCurrency } from '@/lib/helpers/currency'
import { addBankAccountAction } from '@/lib/actions/add-bank-account'

interface NewBankAccountFormProps {
}

export default function NewBankAccountForm({
}: NewBankAccountFormProps) {
	const router = useRouter()

	const [amount, setAmount] = useState(
		formatCurrency(''),
	)

	const { executeAsync, hasSucceeded, isExecuting } = useAction(
		addBankAccountAction,
		{
			onSuccess: () => {
				console.log('Conta adicionada')
			},
			onError: ({ error }) => {
				console.error('Falha ao adicionar conta', error)
				toast.error('Falha ao adicionar conta, tente novamente.')
			},
		},
	)

	const isLoading = hasSucceeded || isExecuting

	const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const formatted = formatCurrency(value)
		setAmount(formatted)
	}, [])

	const onSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()

			const result = await executeAsync({
				accountName: e.target['description'].value,
				initialValue: amount,
			})

			const hasValidationErrors =
				Object.values(result?.validationErrors || {}).length > 0

			if (hasValidationErrors) {
				const error = Object.values(result!.validationErrors!).at(0)
				if (!Array.isArray(error)) {
					toast.error(error?._errors?.at(0))
				}
			}

			if (result?.serverError?.serverError || hasValidationErrors) {
				return
			}

			toast.success('Finalizando...')
			router.replace('/dashboard')
		},
		[amount],
	)

	return (
		<form onSubmit={onSubmit} className="my-8 grid grid-cols-1 gap-4">
			<div>
				<Label>Descrição</Label>
				<Input
					name="description"
					placeholder="Ex: Santander"
				/>
			</div>

			<div>
				<Label>Valor inicial da conta</Label>
				<Input
					name="amount"
					placeholder="Ex: R$ 25,99"
					className="text-right"
					onChange={onChange}
					value={amount}
				/>
			</div>

			<div className="flex justify-end w-full">
				<Button size="lg" disabled={isLoading}>
					{isLoading ? (
						<LoaderCircle className="animate-spin" />
					) : (
						<Save size={18} />
					)}

					Adicionar
				</Button>
			</div>
		</form>
	)
}
