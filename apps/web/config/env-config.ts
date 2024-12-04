import { loadEnvConfig } from '@next/env'

if (process.env.IS_NODE === '1') {
	loadEnvConfig('/usr/src/app/apps/web', true)
}
