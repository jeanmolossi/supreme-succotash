import sharedConfig from '@local/ui/tailwind.config'
import type { Config } from 'tailwindcss'

const config: Pick<Config, 'presets'> = {
	presets: [
		{
			...sharedConfig,
			content: [
				...sharedConfig.content,
				// h/t to https://www.willliu.com/blog/Why-your-Tailwind-styles-aren-t-working-in-your-Turborepo
				'../../packages/ui/src/**/*.{js,jsx,ts,tsx}',
			],
			theme: {
				...sharedConfig.theme,
				extend: {
					...sharedConfig.theme.extend,
					animation: {
						...sharedConfig?.theme?.extend?.animation,
						// Infinite scroll animation
						'infinite-scroll':
							'infinite-scroll 22s linear infinite',
						// Text appear animation
						'text-appear': 'text-appear 0.15s ease',
						// Table pinned column shadow animation
						'table-pinned-shadow':
							'table-pinned-shadow cubic-bezier(0, 0, 1, 0)',
						// Pulse scale animation used for onboarding/welcome
						'pulse-scale': 'pulse-scale 6s ease-out infinite',
						'gradient-move': 'gradient-move 5s linear infinite',
					},
					keyframes: {
						...sharedConfig?.theme?.extend?.keyframes,
						// Infinite scroll animation
						'infinite-scroll': {
							'0%': { transform: 'translateX(0)' },
							'100%': { transform: 'translateX(-150%)' },
						},
						// Text appear animation
						'text-appear': {
							'0%': {
								opacity: '0',
								transform: 'rotateX(45deg) scale(0.95)',
							},
							'100%': {
								opacity: '1',
								transform: 'rotateX(0deg) scale(1)',
							},
						},
						// Table pinned column shadow animation
						'table-pinned-shadow': {
							'0%': {
								filter: 'drop-shadow(rgba(0, 0, 0, 0.1) -2px 10px 6px)',
							},
							'100%': {
								filter: 'drop-shadow(rgba(0, 0, 0, 0) -2px 10px 6px)',
							},
						},
						// Pulse scale animation used for onboarding/welcome
						'pulse-scale': {
							'0%': { transform: 'scale(0.8)', opacity: '0' },
							'30%': { opacity: '1' },
							'100%': { transform: 'scale(2)', opacity: '0' },
						},
						// Gradient move animation for gradient text
						'gradient-move': {
							'0%': { backgroundPosition: '0% 50%' },
							'100%': { backgroundPosition: '200% 50%' },
						},
					},
				},
			},
		},
	],
}

export default config
