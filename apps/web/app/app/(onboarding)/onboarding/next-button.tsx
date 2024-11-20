'use client'

import { OnboardingStep } from '@/lib/onboarding/types'
import { Button, ButtonProps } from '@local/ui'
import { useOnboardingProgress } from './use-onboarding-progress'
import { LoaderCircle } from 'lucide-react'

export function NextButton({
	step,
	children = 'Próximo',
	...props
}: { step: OnboardingStep } & ButtonProps) {
	const { continueTo, isLoading, isSuccessful } = useOnboardingProgress()

	return (
		<Button
			onClick={() => continueTo(step)}
			disabled={isLoading || isSuccessful}
			{...props}
		>
			<>
				{isLoading ||
					(isSuccessful && <LoaderCircle className="animate-spin" />)}
				{children}
			</>
		</Button>
	)
}
