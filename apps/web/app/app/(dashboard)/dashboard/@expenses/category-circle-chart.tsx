'use client'

import { ExpensesResponse } from "@/lib/api/fetchers/fetch-categories";
import { Category } from "@/lib/types/entities/category";
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
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@local/ui"
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Pie, PieChart, LabelList } from "recharts"
import DateRangePicker from "./date-range-picker";
import { someColor } from "@/lib/helpers";

interface CategoryCircleChartProps extends ExpensesResponse {
	categories: Category[]
	selectedCategory?: string
	activeMonth?: string
}

const MONTHS = [
	"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
	"Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

export default function CategoryCircleChart({
	expenses,
	meta,
	categories,
	selectedCategory = '',
	activeMonth = '',
}: CategoryCircleChartProps) {
	const { config, data } = getChartInfo(expenses)
	const expensesTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(meta.total)

	const router = useRouter()

	const onValueChange = useCallback((categoryID: string) => {
		let query = ''
		if (categoryID != '0') {
			query = `?category_id=${categoryID}`
		}

		router.replace(`/dashboard${query}`)
	}, [])

	return (
		<Card className="flex flex-col">
			<CardHeader className="flex-row items-start justify-between space-y-0 pb-0">
				<div className="grid gap-1">

					<CardTitle className="text-xl md:text-2xl">Gastos por categoria</CardTitle>
					<CardDescription>{meta.month} {expensesTotal}</CardDescription>
				</div>

				<div className="grid w-[278px] items-end gap-y-2">
					<Select defaultValue={selectedCategory} onValueChange={onValueChange}>
						<SelectTrigger className="ml-auto h-7 w-full rounded pl-2.5" aria-label="Selecione uma categoria">
							<SelectValue placeholder="Selecione uma categoria" />
						</SelectTrigger>

						<SelectContent>
							{[{ id: '0', name: 'Selecione uma categoria' }].concat(categories).map((category) => (
								<SelectItem key={category.id} value={category.id}>
									<div className="flex items-center gap-1 text-xs">
										<span className="flex h-3 w-3 shrink-0 rounded-sm bg-primary" />
										{category.name}
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>

				</div>
			</CardHeader>

			<CardContent className="flex-1 pb-0">
				{data.length === 0 ? (
					<span className="text-2xl font-medium text-center block">Nada para mostrar aqui 😢</span>
				) : (
					<ChartContainer
						config={config}
						className="mx-auto aspect-square max-h-[320px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
					>
						<PieChart>
							<ChartTooltip content={<ChartTooltipContent hideLabel nameKey="category" indicator="dot" />} />
							<Pie data={data} dataKey="total" nameKey="category">
								<LabelList
									dataKey={"category"}
									className="fill-background"
									stroke="none"
								/>
							</Pie>
						</PieChart>
					</ChartContainer>
				)}
			</CardContent>

			<CardFooter className="flex flex-col items-center">
				<div>Mostrando o total de gastos de {meta.month}</div>
				<strong>{expensesTotal}</strong>
			</CardFooter>
		</Card>
	)
}

function getChartInfo(expenses: ExpensesResponse['expenses']) {
	const config = {} satisfies ChartConfig;
	const data: Array<ExpensesResponse['expenses'][number] & { fill: string }> = []

	expenses.forEach((expense) => {
		config[expense.category_id] = {
			label: expense.category,
			color: someColor(),
		}

		data.push({
			...expense,
			fill: `var(--color-${expense.category_id})`,
		})
	})


	return {
		config,
		data
	}
}
