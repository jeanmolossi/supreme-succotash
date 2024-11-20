import { readFileSync } from 'fs'
import path from 'path'
import { type PackageJson } from 'type-fest'

export function getPackageInfo() {
	const packageJsonPath = path.join('package.json')
	return readJson(packageJsonPath) as PackageJson
}

function readJson(path: string): object {
	const buffer = readFileSync(path, 'utf8')
	return JSON.parse(buffer)
}
