'use client'

import { useCallback, useState } from 'react'
import { formatCurrency } from '@/lib/helpers/currency'
import { formatDateInput } from '@/lib/helpers/dates'
import { BankAccount } from '@/lib/types/entities/bank-account'
import {
	Button,
	Input,
	Label,
	ToggleGroup,
	ToggleGroupItem,
	toast,
} from '@local/ui'
import { ArrowRight, LoaderCircle, Save } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { addOrReplaceTransactionAction } from '@/lib/actions/add-or-replace-transaction-action'
import { useRouter } from 'next/navigation'

interface TransferAmountsFormProps {
	bankAccounts: BankAccount[]
	category: string
}

export default function TransferAmountsForm({
	bankAccounts,
	category,
}: TransferAmountsFormProps) {
	let firstAcc = '',
		secAcc = ''

	if (bankAccounts.length >= 1) {
		firstAcc = bankAccounts.at(0)!.id
	}

	if (bankAccounts.length >= 2) {
		secAcc = bankAccounts.at(1)!.id
	}

	const router = useRouter()

	const [fromAccount, setFromAccount] = useState(firstAcc)
	const [toAccount, setToAccount] = useState(secAcc)

	const [amount, setAmount] = useState(formatCurrency(''))

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

	const [transactedAt, setTransactedAt] = useState(
		formatDateInput(new Date()),
	)

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

			const fromName = bankAccounts.find(b => b.id === fromAccount)?.name
			const toName = bankAccounts.find(b => b.id === toAccount)?.name

			if (!fromName || !toName) {
				toast.warning('Não foi possível encontrar os dados de conta')
				return
			}

			const results = await Promise.all([
				executeAsync({
					description: `Enviado para ${toName}`,
					type: 'outcome',
					amount,
					category_id: category,
					bank_account_id: fromAccount,
					transacted_at: transactedAt,
				}),

				executeAsync({
					description: `Recebido de ${fromName}`,
					type: 'income',
					amount,
					category_id: category,
					bank_account_id: toAccount,
					transacted_at: transactedAt,
				}),
			])

			for (let result of results) {
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
			}

			toast.success('Finalizando...')
			router.replace('/dashboard')
		},
		[fromAccount, toAccount, amount],
	)

	return (
		<form onSubmit={onSubmit} className="my-8 grid grid-cols-1 gap-4">
			<div className="grid grid-cols-[1fr,auto,1fr] gap-4">
				<div>
					<Label>Transferir de</Label>
					<ToggleGroup
						type="single"
						className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4"
						onValueChange={setFromAccount}
						value={fromAccount}
					>
						{bankAccounts.map(account => (
							<ToggleGroupItem
								key={`from-${account.id}`}
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

				<div className="h-full grid place-content-center">
					<ArrowRight />
				</div>

				<div>
					<Label>Para</Label>
					<ToggleGroup
						type="single"
						className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4"
						onValueChange={setToAccount}
						value={toAccount}
					>
						{bankAccounts.map(account => (
							<ToggleGroupItem
								key={`to-${account.id}`}
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

			<div className="flex justify-end w-full">
				<Button size="lg" disabled={isLoading}>
					{isLoading ? (
						<LoaderCircle className="animate-spin" />
					) : (
						<Save size={18} />
					)}
					Transferir
				</Button>
			</div>
		</form>
	)
}
