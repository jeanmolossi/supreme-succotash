import { Timestamps } from './base'

interface BaseBankAccount {
	id: string
	name: string
	family_id: string
	user_id: string
	initial_value: number
}

export interface BankAccount extends BaseBankAccount, Timestamps {}

export interface BankAccountBalance {
	bank_account_id: string
	family_id: string
	account_balance: number
	family_balance: number
	bank_account: BankAccount
}
