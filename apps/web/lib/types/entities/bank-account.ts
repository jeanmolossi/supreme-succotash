import { Timestamps } from './base'

interface BaseBankAccount {
	id: string
	name: string
	family_id: string
	user_id: string
	initial_value: number
}

export interface BankAccount extends BaseBankAccount, Timestamps {}
