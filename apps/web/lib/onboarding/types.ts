export const ONBOARDING_STEPS = ['finalizado'] as const

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number]

export const ONBOARDING = {
	COMPLETED: 'finalizado',
} as const
