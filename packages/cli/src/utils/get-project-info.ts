import { existsSync } from 'fs'

export async function preFlight(cwd: string) {
	const envExampleFile = cwd + '/.env.example'
	const fileExists = existsSync(envExampleFile)

	if (!fileExists) {
		throw new Error(`The file ${envExampleFile} does not exists.`)
	}

	return true
}
