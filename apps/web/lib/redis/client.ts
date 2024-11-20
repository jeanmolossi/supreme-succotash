import serverAppConfig from '@/config/server-app-config'
import { Redis } from '@upstash/redis'

const { REDIS_URL, REDIS_TOKEN } = serverAppConfig

/**
 * Aque deve ser um client http de redis, assim como o upstash
 * para que tenhamos suporte para utilizá-lo em runtimes edge,
 * como o middleware, por exemplo
 */

export const redis = new Redis({
	url: REDIS_URL,
	token: REDIS_TOKEN,
})
