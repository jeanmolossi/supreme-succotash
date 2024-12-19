export function formatCurrency(value: string) {
	if (!value) {
		return ''
	}

	const raw = value.replace(/\D/g, '')

	const formatted = (parseInt(raw) / 100).toLocaleString('pt-BR', {
		currency: 'BRL',
		style: 'currency',
	})

	return formatted
}
