'use server'

import { z } from 'zod'
import { ONBOARDING_STEPS } from '@/lib/onboarding/types'
import { authUserActionClient } from './safe-action'

export const setOnboardingProgress = authUserActionClient
	.schema(
		z.object({
			onboardingStep: z.enum(ONBOARDING_STEPS).nullable(),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { onboardingStep } = parsedInput

		try {
			console.log({ userID: ctx.user.id, onboardingStep })
			// persist onboardingStep
		} catch (e) {
			console.error('failed to update onboarding step', e)
			throw new Error('Failed to update onboarding step')
		}

		return { success: true }
	})
