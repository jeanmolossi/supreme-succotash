import { fetchExpenses } from "@/lib/api/fetchers/fetch-categories";
import ComparisionBarChart from "./comparision-bar-chart";
import { endOfDay, setDate, startOfDay, subMonths } from "date-fns";

export default async function MonthComparisionPage() {
	const just_root_categories = 1
	const today = new Date()

	const until = endOfDay(setDate(today, 28))
	const from = startOfDay(setDate(subMonths(today, 1), 28))

	const comparisionUntil = endOfDay(setDate(subMonths(today, 1), 27))
	const comparisionFrom = startOfDay(setDate(subMonths(today, 2), 27))

	const [base, comparision] = await Promise.all([
		fetchExpenses({ just_root_categories, from, until }),
		fetchExpenses({ just_root_categories, from: comparisionFrom, until: comparisionUntil }),
	])

	return (
		<div>
			<ComparisionBarChart baseExpenses={base} comparitionExpenses={comparision} />
		</div>
	)
}
