import { Ratelimit } from '@upstash/ratelimit'
import { redis } from './client'

export const ratelimit = (
	requests: number = 10,
	seconds:
		| `${number} ms`
		| `${number} s`
		| `${number} m`
		| `${number} h`
		| `${number} d` = '10 s',
) => {
	return new Ratelimit({
		redis,
		limiter: Ratelimit.slidingWindow(requests, seconds),
		analytics: true,
		prefix: 'nexo',
	})
}
