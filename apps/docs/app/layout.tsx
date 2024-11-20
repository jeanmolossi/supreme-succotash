import '@/styles/globals.css';
import { ThemeProvider } from '@local/ui';
import '@local/ui/dist/index.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import type { JSX } from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'App Docs',
	description: 'That is your app docs',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}): JSX.Element {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
