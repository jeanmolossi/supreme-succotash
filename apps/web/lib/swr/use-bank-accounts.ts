'use client'

import useSWR from 'swr'
import { fetcher } from '@local/utils'
import { ResultOf } from '@/lib/types/swr/result'
import { UserBankAccounts } from '@/lib/types/swr/bank-accounts'

export default function useBankAccounts() {
	const { data: bankAccounts, error } = useSWR<ResultOf<UserBankAccounts>>(
		'/api/bank-accounts',
		fetcher,
		{ dedupingInterval: 60_000 },
	)

	return {
		bankAccounts,
		loading: !bankAccounts && !error,
		error,
	}
}
