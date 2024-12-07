'use client'

import { BankAccount } from '@/lib/types/entities/bank-account'
import {
	Button,
	Input,
	Label,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
	ToggleGroup,
	ToggleGroupItem,
	toast,
} from '@local/ui'
import React, { useCallback, useState } from 'react'
import { GroupedCategory } from './parsers'
import { useAction } from 'next-safe-action/hooks'
import { addTransactionAction } from '@/lib/actions/add-transaction-action'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface NewTransactionFormProps {
	bankAccounts: BankAccount[]
	categories: GroupedCategory[]
}

export default function NewTransactionForm({
	bankAccounts,
	categories,
}: NewTransactionFormProps) {
	const router = useRouter()
	const [type, setType] = useState<'income' | 'outcome'>('outcome')
	const [account, setAccount] = useState(bankAccounts.at(0)?.id || '')
	const defaultCategory = categories.at(0)!
	const [category, setCategory] = useState(defaultCategory.id)
	const [amount, setAmount] = useState('')

	const { executeAsync, hasSucceeded, isExecuting } = useAction(
		addTransactionAction,
		{
			onSuccess: () => {
				console.log('Transação adicionada')
			},
			onError: ({ error }) => {
				console.error('Falha ao adicionar transacao', error)
				toast.error('Falha ao adicionar transação, tente novamente.')
			},
		},
	)

	const isLoading = hasSucceeded || isExecuting

	const parseAmount = useCallback((value: string) => {
		if (!value) {
			return ''
		}

		const raw = value.replace(/\D/g, '')

		const formatted = (parseInt(raw) / 100).toLocaleString('pt-BR', {
			currency: 'BRL',
			style: 'currency',
		})

		return formatted
	}, [])

	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value
			const formatted = parseAmount(value)
			setAmount(formatted)
		},
		[parseAmount],
	)

	const onSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()

			const result = await executeAsync({
				description: e.target['description'].value as string,
				type,
				amount,
				category_id: category,
				bank_account_id: account,
			})

			if (result?.serverError?.serverError) {
				return
			}

			toast.success('Finalizando...')
			router.replace('/dashboard')
		},
		[type, account, category, amount],
	)

	return (
		<form onSubmit={onSubmit} className="my-8 grid grid-cols-1 gap-4">
			<div>
				<Label>Descrição</Label>
				<Input name="description" placeholder="Ex: Rancho" />
			</div>

			<div>
				<Label>Conta</Label>
				<ToggleGroup
					type="single"
					className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4"
					onValueChange={setAccount}
					value={account}
				>
					{bankAccounts.map(account => (
						<ToggleGroupItem
							key={account.id}
							name="bank_account"
							value={account.id}
							className="border"
							variant="success"
						>
							{account.name}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
			</div>

			<div>
				<Label>Categoria</Label>

				<Select onValueChange={setCategory} value={category}>
					<SelectTrigger>
						<SelectValue placeholder={defaultCategory.name} />
					</SelectTrigger>

					<SelectContent>
						{categories.map((category, idx) => (
							<React.Fragment key={category.id}>
								<SelectGroup key={category.id}>
									{category.sub_categories.length === 0 ? (
										<SelectItem value={category.id}>
											{category.name}
										</SelectItem>
									) : (
										<SelectLabel>
											{category.name}
										</SelectLabel>
									)}

									{category.sub_categories.map(
										subCategory => (
											<SelectItem
												key={subCategory.id}
												value={subCategory.id}
											>
												{subCategory.name}
											</SelectItem>
										),
									)}
								</SelectGroup>

								{categories.length - 1 > idx && (
									<SelectSeparator />
								)}
							</React.Fragment>
						))}
					</SelectContent>
				</Select>
			</div>

			<div>
				<Label>Valor</Label>
				<Input
					name="amount"
					placeholder="Ex: R$ 25,99"
					className="text-right"
					onChange={onChange}
					value={amount}
				/>
			</div>

			<div>
				{/* @ts-expect-error onValueChange has value as string, but setType expects static types 'income' | 'outcome' */}
				<ToggleGroup type="single" onValueChange={setType} value={type}>
					<ToggleGroupItem
						value="income"
						name="type"
						variant="success"
						className="min-w-36 border"
					>
						Entrada
					</ToggleGroupItem>

					<ToggleGroupItem
						value="outcome"
						name="type"
						variant="destructive"
						className="min-w-36 border"
					>
						Saída
					</ToggleGroupItem>
				</ToggleGroup>
			</div>

			<div className="flex justify-end w-full">
				<Button size="lg" disabled={isLoading}>
					{isLoading && <LoaderCircle className="animate-spin" />}
					Adicionar
				</Button>
			</div>
		</form>
	)
}
