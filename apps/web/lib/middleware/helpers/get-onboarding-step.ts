import { ONBOARDING, OnboardingStep } from '@/lib/onboarding/types'
import { User } from '@/lib/types/entities/user'

export async function getOnboardingStep(user: User): Promise<OnboardingStep> {
	if (!user) {
		throw new Error('user should exists')
	}

	return ONBOARDING.COMPLETED
}
