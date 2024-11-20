export const ONBOARDING_STEPS = ['familia', 'contas', 'finalizado'] as const

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number]

export const ONBOARDING = {
	COMPLETED: 'finalizado',
	FAMILY: 'familia',
	ACCOUNTS: 'contas',
} as const
