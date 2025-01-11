'use client';

import { TrendingUp, X } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@local/ui";
import { getMonth } from 'date-fns'
import { ExpensesResponse } from "@/lib/api/fetchers/fetch-categories";
import { someColor, toBRL } from "@/lib/helpers";

const chartData = [
	{ month: "Delivery", dezembro: 186, janeiro: 80 },
	{ month: "Gastos pessoais", dezembro: 305, janeiro: 200 },
	{ month: "Casa", dezembro: 237, janeiro: 120 },
	{ month: "April", dezembro: 73, janeiro: 190 },
	{ month: "May", dezembro: 209, janeiro: 130 },
	{ month: "June", dezembro: 214, janeiro: 140 },
]
const chartConfig = {
	dezembro: {
		label: "Dezembro",
		color: "hsl(var(--chart-1))",
	},
	janeiro: {
		label: "Janeiro",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig

interface ComparisionBarChartProps {
	baseExpenses: ExpensesResponse;
	comparitionExpenses: ExpensesResponse;
}

export default function ComparisionBarChart({
	baseExpenses,
	comparitionExpenses,
}: ComparisionBarChartProps) {
	const { config, data } = extractConfigAndData(baseExpenses, comparitionExpenses)
	const { base, compare, baseTotal, compareTotal } = {
		base: baseExpenses.meta.month,
		compare: comparitionExpenses.meta.month,

		baseTotal: toBRL(baseExpenses.meta.total),
		compareTotal: toBRL(comparitionExpenses.meta.total),
	}


	console.log(
		baseExpenses.meta.month,
		comparitionExpenses.meta.month
	)

	return (
		<Card>
			<CardHeader>
				<CardTitle className="">Mês <X className="inline" size={12} /> Mês</CardTitle>
				<CardDescription>{compare} - {base}</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={config}>
					<BarChart accessibilityLayer data={data}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="label"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<ChartTooltip
							content={<ChartTooltipContent indicator="dashed" />}
						/>
						<ChartLegend content={<ChartLegendContent />} />
						<Bar dataKey={compare} fill={`var(--color-${compare})`} radius={4} />
						<Bar dataKey={base} fill={`var(--color-${base})`} radius={4} />
					</BarChart>
				</ChartContainer>
			</CardContent>

			<CardFooter>
				<span className="text-sm text-muted-foreground">
					Comparação entre o mês de {compare} com {base} <TrendingUp className="inline ml-2" size={14} />
				</span>

				<div className="flex gap-2 text-sm">
					<span>Gastos de {base}: {baseTotal}</span>
					<span>Gastos de {compare}: {compareTotal}</span>
				</div>
			</CardFooter>
		</Card>
	)
}

function extractConfigAndData(expenses: ExpensesResponse, compare: ExpensesResponse) {
	const config = {
		[expenses.meta.month]: {
			label: expenses.meta.month,
			color: "hsl(var(--chart-2))",
		},
		[compare.meta.month]: {
			label: compare.meta.month,
			color: "hsl(var(--chart-1))",
		}
	} as any
	const data = [] as any

	const compareMap = new Map(
		compare.expenses.map((expense) => [expense.category_id, expense])
	)

	expenses.expenses.forEach(expense => {
		const comparer = compareMap.get(expense.category_id)

		data.push({
			category: expense.category_id,
			label: expense.category,
			[expenses.meta.month]: expense.total || 0,
			[compare.meta.month]: comparer?.total || 0,
		})
	})

	return { config, data }
}
