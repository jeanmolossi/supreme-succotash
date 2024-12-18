'use client'

import {
	Button,
	Input,
	Label,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
	toast,
} from '@local/ui'
import React, { useCallback, useState } from 'react'
import { GroupedCategory } from './parsers'
import { useAction } from 'next-safe-action/hooks'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { addCategoryAction } from '@/lib/actions/add-category-action'

interface NewCategoryFormProps {
	categories: GroupedCategory[]
}

export default function NewCategoryForm({ categories }: NewCategoryFormProps) {
	const router = useRouter()
	const [category, setCategory] = useState('')

	const { executeAsync, hasSucceeded, isExecuting } = useAction(
		addCategoryAction,
		{
			onSuccess: () => {
				console.log('Categoria adicionada')
			},
			onError: ({ error }) => {
				console.error('Falha ao adicionar categoria', error)
				toast.error('Falha ao adicionar categoria, tente novamente.')
			},
		},
	)

	const isLoading = hasSucceeded || isExecuting

	const onSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()

			const result = await executeAsync({
				name: e.target['name'].value as string,
				parent_id: category,
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
		[category],
	)

	return (
		<form onSubmit={onSubmit} className="my-8 grid grid-cols-1 gap-4">
			<div>
				<Label>Nome</Label>
				<Input name="name" placeholder="Ex: Ifood" />
			</div>

			<div>
				<Label>Categoria pai</Label>

				<Select onValueChange={setCategory} value={category}>
					<SelectTrigger>
						<SelectValue placeholder={'Alimentação'} />
					</SelectTrigger>

					<SelectContent>
						{categories.map((category, idx) => (
							<React.Fragment key={category.id}>
								<SelectGroup key={category.id}>
									<SelectItem value={category.id}>
										{category.name}
									</SelectItem>
								</SelectGroup>

								{categories.length - 1 > idx && (
									<SelectSeparator />
								)}
							</React.Fragment>
						))}
					</SelectContent>
				</Select>
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
