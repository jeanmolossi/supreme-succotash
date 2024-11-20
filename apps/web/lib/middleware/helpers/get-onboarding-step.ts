import { User } from '@/lib/drizzle/types'
import { ONBOARDING, OnboardingStep } from '@/lib/onboarding/types'

export async function getOnboardingStep(user: User): Promise<OnboardingStep> {
	if (!user) {
		throw new Error('user should exists')
	}

	return ONBOARDING.COMPLETED
}
