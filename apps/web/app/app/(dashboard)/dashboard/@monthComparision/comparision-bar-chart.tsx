'use client';

import { TrendingDown, TrendingUp, X } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@local/ui";
import { ExpensesResponse } from "@/lib/api/fetchers/fetch-categories";
import { toBRL } from "@/lib/helpers";

interface ComparisionBarChartProps {
	baseExpenses: ExpensesResponse;
	comparitionExpenses: ExpensesResponse;
}

export default function ComparisionBarChart({
	baseExpenses,
	comparitionExpenses,
}: ComparisionBarChartProps) {
	const { config, data } = extractConfigAndData(baseExpenses, comparitionExpenses)
	const { base, compare, baseTotal, compareTotal, isUp } = {
		base: baseExpenses.meta.month,
		compare: comparitionExpenses.meta.month,

		baseTotal: toBRL(baseExpenses.meta.total),
		compareTotal: toBRL(comparitionExpenses.meta.total),
		isUp: baseExpenses.meta.total >= comparitionExpenses.meta.total,
	}

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

			<CardFooter className="grid gap-2">
				<span className="text-sm text-muted-foreground">
					Comparação entre os mêses de {compare} e {base}.
					Vocês tiveram {isUp
						? <>um <span className="text-destructive font-medium">aumento</span> de gastos</>
						: <>uma <span className="text-green-600 font-medium">redução</span> de gastos</>
					}
				</span>

				<div className="grid grid-cols-[1fr,1rem,1fr] gap-2 text-sm text-center">
					<span>Gastos de {compare}: {compareTotal}</span>
					<span className="grid place-items-center">
						{isUp
							? (<TrendingUp className="text-destructive" size={22} />)
							: (<TrendingDown className="text-green-600" size={22} />)
						}
					</span>
					<span>Gastos de {base}: {baseTotal}</span>
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

		if (comparer?.total == expense.total && expense.total == 0) {
			return
		}

		data.push({
			category: expense.category_id,
			label: expense.category,
			[expenses.meta.month]: expense.total || 0,
			[compare.meta.month]: comparer?.total || 0,
		})
	})

	return { config, data }
}
