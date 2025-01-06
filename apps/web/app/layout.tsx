import '@/styles/globals.css'
import { ThemeProvider, Toaster } from '@local/ui'
import '@local/ui/dist/index.css'
import { cn } from '@local/utils'
import type { Metadata } from 'next'
import type { JSX } from 'react'
import { Inter, Nunito_Sans } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const nunitoSans = Nunito_Sans({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '600', '700'],
	variable: '--font-nunito-sans',
})

export const metadata: Metadata = {
	title: 'Family Finance',
	description: 'Faça seu cadastro',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}): JSX.Element {
	return (
		<html lang="en">
			<head>
				<meta name="apple-mobile-web-app-title" content="Finances" />
			</head>
			<body className={cn(inter.variable, nunitoSans.variable)}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
				>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}
