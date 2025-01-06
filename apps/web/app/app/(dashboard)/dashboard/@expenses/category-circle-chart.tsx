'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	ChartContainer,
	ChartConfig,
	ChartTooltip,
	ChartTooltipContent,
} from "@local/ui"
import { Pie, PieChart } from "recharts"

interface CategoryCircleChartProps {
	expenses: Array<{
		category_id: string;
		category: string;
		total: number;
	}>;
	meta: {
		total: number;
	};
}

function someColor() {
	return `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`;
}

export default function CategoryCircleChart({ expenses, meta }: CategoryCircleChartProps) {
	const chartConfig = expenses.reduce((acc, category,) => {
		acc[category.category_id] = {
			label: category.category,
			color: someColor(),
		}

		return acc
	}, {}) satisfies ChartConfig;

	const data = expenses.map(expense => ({
		...expense,
		fill: `var(--color-${expense.category_id})`
	}))

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Gastos por categoria</CardTitle>
				<CardDescription>Janeiro</CardDescription>
			</CardHeader>

			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[320px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
				>
					<PieChart>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<Pie data={data} dataKey="total" nameKey="category" label />
					</PieChart>
				</ChartContainer>
			</CardContent>

			<CardFooter>
				<div>Mostrando o total de gastos de Janeiro</div>
			</CardFooter>
		</Card>
	)
}
