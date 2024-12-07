import { Timestamps } from './base'

interface BaseTransaction {
	id: string
	transacted_at: string
	family_id: string
	user_id: string
	bank_account_id: string
	category_id: string
	type: 'income' | 'outcome'
	description: string
	amount: number
}

export interface Transaction extends BaseTransaction, Timestamps {}
