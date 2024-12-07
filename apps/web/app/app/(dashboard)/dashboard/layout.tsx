import React from 'react'

export default function DashboardLayout({
	children,
	transactions,
	accounts,
}: {
	children: React.ReactNode
	transactions: React.ReactNode
	accounts: React.ReactNode
}) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
			<div>{accounts}</div>
			<div>{transactions}</div>
			<div>{children}</div>
		</div>
	)
}
