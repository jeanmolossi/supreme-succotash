'use client'

import { OnboardingStep } from '@/lib/onboarding/types'
import { Button, ButtonProps } from '@local/ui'
import { useOnboardingProgress } from './use-onboarding-progress'
import { LoaderCircle } from 'lucide-react'

export function LaterButton({
	step,
	children = 'Fazer mais tarde',
	variant = 'secondary',
	...props
}: { step: OnboardingStep | 'finish' } & ButtonProps) {
	const { finish, continueTo, isLoading, isSuccessful } =
		useOnboardingProgress()

	return (
		<Button
			onClick={() => (step === 'finish' ? finish() : continueTo(step))}
			disabled={isLoading || isSuccessful}
			variant={variant}
			{...props}
		>
			<>
				{(isLoading || isSuccessful) && (
					<LoaderCircle className="animate-spin" />
				)}
				{children}
			</>
		</Button>
	)
}
