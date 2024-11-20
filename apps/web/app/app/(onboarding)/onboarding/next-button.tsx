'use client'

import { OnboardingStep } from '@/lib/onboarding/types'
import { Button, ButtonProps } from '@repo/ui'
// import { LoaderCircle } from 'lucide-react'

export function NextButton({
	step,
	children = 'Próximo',
	...props
}: { step: OnboardingStep } & ButtonProps) {
	return (
		<Button {...props}>
			{/* <LoaderCircle className="animate-spin" /> */}
			{children}
		</Button>
	)
}
