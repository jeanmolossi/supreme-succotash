'use client'

import { toBRL } from "@/lib/helpers"
import { currencyToFloat, formatCurrency } from "@/lib/helpers/currency"
import {
	Input,
	Label,
} from "@local/ui"
import { addMonths, format, parseISO, startOfMonth } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import { useCallback, useEffect, useState } from "react"

export default function Calculator() {
	const defaultTarget = format(addMonths(new Date(), 6), 'yyyy-MM-dd', { locale: ptBR })
	const currMonth = startOfMonth(new Date())

	const [objective, setObjective] = useState('')
	const [targetDate, setTargetDate] = useState(defaultTarget)
	const [familyGain, setFamilyGain] = useState('')
	const [familyCosts, setFamilyCosts] = useState('R$ 4.000,00')
	const [monthlyInvest, setMonthlyInvest] = useState('R$ 0,00')
	const [monthlyResult, setMonthlyResult] = useState('')

	const onChangeField = useCallback((cb: Function, mask?: Function): React.ChangeEventHandler<HTMLInputElement> => {
		return (e) => {
			const value = e.target.value
			if (mask && typeof mask === 'function') {
				cb(mask(value))
				return
			}

			cb(value)
		}
	}, [])

	useEffect(() => {
		const target = parseISO(targetDate).getMonth()
		const starting = currMonth.getMonth()
		const months = target - starting

		if (isNaN(target) || isNaN(starting) || isNaN(months)) {
			console.error('some values was not filled')
			return
		}

		const objectiveByMonth = Math.ceil(
			currencyToFloat(objective) / months
		)

		const familyGainByMonth = currencyToFloat(familyGain)
		const investByMonth = currencyToFloat(monthlyInvest)

		if (objectiveByMonth >= familyGainByMonth) {
			console.error('objective greather than family gain')
			setMonthlyResult('Vocês precisam ganhar mais para isso!')
			return
		}

		const familyCostByMonth = currencyToFloat(familyCosts)
		const restValue = familyGainByMonth - familyCostByMonth

		const maxEnough = toBRL(restValue * months / 100)

		if (objectiveByMonth > restValue) {
			console.error('available value is not enough')
			setMonthlyResult(`Vocês podem se projetar para até ${maxEnough}`)
			return
		}

		const rest = familyGainByMonth - investByMonth

		if (objectiveByMonth >= rest) {
			console.error('objective greather than rest value')
			setMonthlyResult('Vocês precisam considerar um objetivo menor')
			return
		}

		const shouldInvest = objectiveByMonth - investByMonth > 0
			? objectiveByMonth - investByMonth
			: investByMonth - objectiveByMonth


		const investValue = toBRL(shouldInvest / 100)

		setMonthlyResult(`Vocês precisam guardar ${investValue} por mês`)
	}, [objective, targetDate, familyGain, familyCosts, monthlyInvest])

	return (
		<div className="grid gap-2">
			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<Label>Qual valor você quer acumular?</Label>
					<Input
						placeholder="R$ 80.000,00"
						value={objective}
						onChange={onChangeField(setObjective, formatCurrency)}
					/>
				</div>

				<div>
					<Label>Até que data?</Label>
					<Input
						type="date"
						value={targetDate}
						onChange={onChangeField(setTargetDate)}
					/>
				</div>

				<div>
					<Label>Qual a receita líquida da família?</Label>
					<Input
						placeholder="R$ 10.000,00"
						value={familyGain}
						onChange={onChangeField(setFamilyGain, formatCurrency)}
					/>
				</div>

				<div>
					<Label>Qual o orçamento mensal da família?</Label>
					<Input
						placeholder="R$ 4.000,00"
						value={familyCosts}
						onChange={onChangeField(setFamilyCosts, formatCurrency)}
					/>
				</div>

				<div>
					<Label>Qual o valor investido por mês?</Label>
					<Input
						placeholder="R$ 2.000,00"
						value={monthlyInvest}
						onChange={onChangeField(setMonthlyInvest, formatCurrency)}
					/>
				</div>
			</div>

			<div className="grid place-content-center mt-6 gap-2">
				<span className="text-muted-foreground text-sm">
					A sujestão abaixo, não considera parcelas/valores acima do orçamento informado.
					Certifique-se de informar valores dentro da sua realidade.
				</span>

				{(monthlyResult) ? (
					<span className="italic">{monthlyResult}</span>
				) : 'Responda as perguntas acima para calcular'}
			</div>
		</div>
	)
}
