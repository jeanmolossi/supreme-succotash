import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { ONBOARDING, OnboardingStep } from '@/lib/onboarding/types'
import { setOnboardingProgress } from '@/lib/actions/set-onboarding-progress'
import { toast } from 'sonner'

export function useOnboardingProgress() {
	const router = useRouter()
	const searchParams = useSearchParams()

	const inviteCode = searchParams.get('family-invite')

	const { execute, executeAsync, isExecuting, hasSucceeded } = useAction(
		setOnboardingProgress,
		{
			onSuccess: () => {
				console.log('onboaring progress updated')
			},
			onError: ({ error }) => {
				toast.error(
					'O sistema falhou para processar esta ação. Tente outra vez',
				)
				console.error('Failed to update onboarding progress')
			},
		},
	)

	const continueTo = useCallback(async (step: OnboardingStep) => {
		execute({ onboardingStep: step })
		const queryParams =
			step === ONBOARDING.FAMILY && inviteCode
				? '?family-invite=' + inviteCode
				: ''

		router.push(`/onboarding/${step}${queryParams}`)
	}, [])

	const finish = useCallback(async () => {
		await executeAsync({ onboardingStep: ONBOARDING.COMPLETED })
		router.push(`/dashboard`)
	}, [executeAsync, router])

	return {
		continueTo,
		finish,
		isLoading: isExecuting,
		isSuccessful: hasSucceeded,
	}
}
