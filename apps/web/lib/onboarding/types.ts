export const ONBOARDING_STEPS = [
	'familia',
	'contas',
	'primeira-transacao',
	'finalizado',
] as const

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number]

export const ONBOARDING = {
	COMPLETED: 'finalizado',
	FAMILY: 'familia',
	ACCOUNTS: 'contas',
	FIRST_TRANSACTION: 'primeira-transacao',
} as const
