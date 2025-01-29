import { fetchExpenses } from '@/lib/api/fetchers/fetch-categories'
import ComparisionBarChart from './comparision-bar-chart'
import { addMonths, endOfDay, setDate, startOfDay, subMonths } from 'date-fns'

export default async function MonthComparisionPage() {
	const just_root_categories = 1
	const today = new Date()

	const turnMonthDate = 28
	const amount = today.getDate() >= turnMonthDate ? 1 : 0

	const from = startOfDay(
		setDate(subMonths(today, 1 - amount), turnMonthDate),
	)
	const until = endOfDay(setDate(addMonths(today, amount), turnMonthDate - 1))

	const comparisionFrom = startOfDay(
		subMonths(setDate(today, turnMonthDate), 2 - amount),
	)
	const comparisionUntil = endOfDay(
		subMonths(setDate(today, turnMonthDate - 1), 1 - amount),
	)

	const [base, comparision] = await Promise.all([
		fetchExpenses({ just_root_categories, from, until }),
		fetchExpenses({
			just_root_categories,
			from: comparisionFrom,
			until: comparisionUntil,
		}),
	])

	console.log('current', base.meta, 'prev', comparision.meta)

	return (
		<div>
			<ComparisionBarChart
				baseExpenses={base}
				comparitionExpenses={comparision}
			/>
		</div>
	)
}
