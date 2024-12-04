'use client'

import { Button, Input, Label, toast } from '@local/ui'
import { Suspense, useCallback, useState } from 'react'
import { useAction } from 'next-safe-action/hooks'
import { joinFamilyAction } from '@/lib/actions/join-family-action'
import { useOnboardingProgress } from '../../use-onboarding-progress'
import { LoaderCircle } from 'lucide-react'

export default function JoinFamilyForm({ invite = '' }: { invite?: string }) {
	const [code, setCode] = useState<string>(invite)

	const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setCode(e.target.value)
	}, [])

	const { executeAsync, hasSucceeded, isExecuting } = useAction(
		joinFamilyAction,
		{
			onSuccess: () => {
				console.log('Joined in family')
			},
			onError: ({ error }) => {
				console.log(error)
				toast.error(
					'O sistema falhou para colocar você na família, tente mais tarde',
				)
			},
		},
	)

	const { finish } = useOnboardingProgress()

	const onContinue = useCallback(async () => {
		const joined = await executeAsync({ family_id: code })

		if (joined?.serverError?.serverError) {
			return null
		}

		toast('Continuando...')

		await finish()
	}, [executeAsync, finish, code])

	return (
		<>
			<p>Você possui um código de família ?</p>

			<div className="flex flex-col w-full gap-1">
				<Label>Código de família</Label>
				<Input
					placeholder="ex: abe53d09-88ba-08a7-afa8-56fafbb5abf0"
					value={code}
					onChange={onChange}
				/>
			</div>

			<Suspense>
				<Button
					onClick={onContinue}
					variant="default"
					disabled={isExecuting || hasSucceeded}
				>
					{(isExecuting || hasSucceeded) && (
						<LoaderCircle className="animate-spin" />
					)}
					Entrar na família
				</Button>
			</Suspense>
		</>
	)
}
