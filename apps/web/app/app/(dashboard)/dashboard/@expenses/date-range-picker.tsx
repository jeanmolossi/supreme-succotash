'use client'

import { Button, Calendar, Popover, PopoverContent, PopoverTrigger, DateRange } from "@local/ui";
import { CalendarIcon } from "lucide-react";
import { useCallback } from "react";
import { format, parseISO } from 'date-fns'
import { cn } from "@local/utils";
import { useRouter } from "next/navigation";

interface DateRangePickerProps {
	from: string;
	to: string;
}

export default function DateRangePicker({ from, to }: DateRangePickerProps) {
	const date: DateRange = {
		from: parseISO(from),
		to: parseISO(to),
	}

	const router = useRouter()

	const onSelect = useCallback((date: DateRange) => {
		const { from, to } = date
		const queryObj = new URLSearchParams()

		if (from) {
			queryObj.append("from", from.toISOString())
		}

		if (to) {
			queryObj.append("until", to.toISOString())
		}

		const query = queryObj.toString()

		router.replace(`/dashboard?${query}`)
	}, [])

	return (
		<div className="w-full my-2">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"w-full justify-start text-left font-normal",
							!date && "text-muted-foreground"
						)}
					>
						<CalendarIcon />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, "LLL dd, y")} -{" "}
									{format(date.to, "LLL dd, y")}
								</>
							) : (
								format(date.from, "LLL dd, y")
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={onSelect}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
