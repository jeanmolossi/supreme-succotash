'use client'

import { useCallback, useState } from 'react'
import { useAction } from 'next-safe-action/hooks'
import { LoaderCircle, PlusCircle, XCircle } from 'lucide-react'
import { Button, Input, Label, toast } from '@local/ui'
import { addBankAccountAction } from '@/lib/actions/add-bank-account'
import { useOnboardingProgress } from '../../use-onboarding-progress'

const MAX_ACCOUNTS = 5

interface Account {
	name: string
	initialValue: string
}

export default function Accounts() {
	const { executeAsync, hasSucceeded, isExecuting } = useAction(
		addBankAccountAction,
		{
			onSuccess: () => {
				console.log('Bank account added')
			},
			onError: ({ error }) => {
				console.log(error)
				toast.error(
					'O sistema falhou para salvar suas contas. Tente novamente.',
				)
			},
		},
	)

	const { continueTo } = useOnboardingProgress()

	const [money, setMoney] = useState<Account>({
		name: 'Dinheiro',
		initialValue: 'R$ 0,00',
	})

	const [accounts, setAccounts] = useState<Account[]>([])

	const onChangeName = useCallback(
		(index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value
			setAccounts(prevAccounts => {
				prevAccounts[index].name = value
				return [...prevAccounts]
			})
		},
		[],
	)

	const onChangeValue = useCallback((index: number) => {
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value
			const formatted = formatCurrency(value)
			setAccounts(prevAccounts => {
				prevAccounts[index].initialValue = formatted
				return [...prevAccounts]
			})
		}
	}, [])

	const addAccount = () => {
		setAccounts(prevAccounts => {
			if (prevAccounts.length === MAX_ACCOUNTS) {
				return prevAccounts
			}

			return [...prevAccounts, { name: '', initialValue: '' }]
		})
	}

	const onChangeMoney = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value
			const formatted = formatCurrency(value)
			setMoney(prevMoney => ({
				...prevMoney,
				initialValue: formatted,
			}))
		},
		[],
	)

	const onContinue = useCallback(async () => {
		const moneyPromise = executeAsync({
			accountName: money.name,
			initialValue: money.initialValue,
		})

		const results = await Promise.all(
			accounts.map(async account => {
				const result = await executeAsync({
					accountName: account.name,
					initialValue: account.initialValue,
				})

				if (result?.serverError?.serverError) {
					return result?.serverError?.serverError || null
				}

				return null
			}),
		)

		const resultSet = new Set(results)
		if (!(resultSet.has(null) && resultSet.size === 1)) {
			return
		}

		const result = await moneyPromise
		if (result?.serverError?.serverError) {
			return
		}

		toast('Continuando...')

		await continueTo('primeira-transacao')
	}, [executeAsync, money, accounts, continueTo])

	return (
		<div className="flex flex-col gap-4 border bg-white/30 rounded-lg w-full p-2">
			<div className="border border-black/10 p-4 rounded-md grid grid-cols-1 md:grid-cols-[100px,1fr] md:place-items-center gap-2">
				<Label>Conta Dinheiro</Label>
				<Input placeholder="ex: Bradesco" value={money.name} disabled />
				<Label>Saldo inicial</Label>
				<Input
					placeholder="ex: R$ 2,400.00"
					value={money.initialValue}
					onChange={onChangeMoney}
				/>
			</div>

			{accounts.map((account, i) => (
				<div
					key={i}
					className="border border-black/10 p-4 rounded-md grid grid-cols-1 md:grid-cols-[100px,1fr] md:place-items-center gap-2"
				>
					<Label>Conta {i + 1}</Label>
					<Input
						placeholder="ex: Bradesco"
						value={account.name}
						onChange={onChangeName(i)}
					/>
					<Label>Saldo inicial</Label>
					<Input
						placeholder="ex: R$ 2,400.00"
						value={account.initialValue}
						onChange={onChangeValue(i)}
					/>
				</div>
			))}

			<Button
				variant="outline"
				onClick={addAccount}
				disabled={accounts.length === MAX_ACCOUNTS}
			>
				{accounts.length === MAX_ACCOUNTS ? (
					<>
						<XCircle size={15} />
						Limite de contas atingido
					</>
				) : (
					<>
						<PlusCircle size={15} />
						Adicionar conta
					</>
				)}
			</Button>

			<Button onClick={onContinue} disabled={isExecuting || hasSucceeded}>
				{(isExecuting || hasSucceeded) && (
					<LoaderCircle className="animate-spin" />
				)}
				Salvar contas e continuar
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
