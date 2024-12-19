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
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { formatDateInput } from '@/lib/helpers/dates'
import { Transaction } from '@/lib/types/entities/transaction'
import { formatCurrency } from '@/lib/helpers/currency'
import { addOrReplaceTransactionAction } from '@/lib/actions/add-or-replace-transaction-action'

interface NewTransactionFormProps {
	bankAccounts: BankAccount[]
	categories: GroupedCategory[]
	transaction?: Transaction
}

export default function NewTransactionForm({
	bankAccounts,
	categories,
	transaction,
}: NewTransactionFormProps) {
	const router = useRouter()

	const [type, setType] = useState<'income' | 'outcome'>(
		transaction?.type || 'outcome',
	)
	const [account, setAccount] = useState(
		transaction?.bank_account_id || bankAccounts.at(0)?.id || '',
	)
	const defaultCategory = transaction?.category_id
		? { id: transaction.category_id, name: 'Selecione para alterar' }
		: categories.at(0)!

	const [category, setCategory] = useState(defaultCategory.id)
	const [amount, setAmount] = useState(
		formatCurrency(transaction?.amount.toFixed(2) || ''),
	)
	const [transactedAt, setTransactedAt] = useState(
		formatDateInput(transaction?.transacted_at || new Date()),
	)

	const { executeAsync, hasSucceeded, isExecuting } = useAction(
		addOrReplaceTransactionAction,
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

	const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const formatted = formatCurrency(value)
		setAmount(formatted)
	}, [])

	const onChangeTransactedAt = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value
			setTransactedAt(formatDateInput(value))
		},
		[],
	)

	const onSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()

			const result = await executeAsync({
				id: transaction?.id,
				description: e.target['description'].value as string,
				type,
				amount,
				category_id: category,
				bank_account_id: account,
				transacted_at: transactedAt,
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
		[type, account, category, amount, transactedAt],
	)

	return (
		<form onSubmit={onSubmit} className="my-8 grid grid-cols-1 gap-4">
			<div>
				<Label>Descrição</Label>
				<Input
					name="description"
					placeholder="Ex: Rancho"
					defaultValue={transaction?.description}
				/>
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

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
					<Label>Data</Label>
					<Input
						name="transacted_at"
						type="datetime-local"
						className="text-right"
						onChange={onChangeTransactedAt}
						value={transactedAt}
					/>
				</div>
			</div>

			<div>
				{/* @ts-expect-error onValueChange has value as string, but setType expects static types 'income' | 'outcome' */}
				<ToggleGroup type="single" onValueChange={setType} value={type}>
					<ToggleGroupItem
						value="credit"
						name="type"
						variant="default"
						className="min-w-36 border"
					>
						Crédito
					</ToggleGroupItem>

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
					{transaction?.id ? 'Salvar' : 'Adicionar'}
				</Button>
			</div>
		</form>
	)
}
