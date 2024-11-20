import { NextRequest, NextResponse } from 'next/server'
import { parse } from './helpers'

export default async function LpMiddleware(request: NextRequest) {
	const { fullPath } = parse(request)
	return NextResponse.rewrite(new URL(`/lp${fullPath}`, request.url))
}
