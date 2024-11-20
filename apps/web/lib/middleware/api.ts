import { HOME_DOMAIN } from '@repo/utils'
import { NextRequest, NextResponse } from 'next/server'
import { parse } from './helpers'

const METATAGS_PATH = '/metatags'

export default async function ApiMiddleware(request: NextRequest) {
	const { path, fullPath } = parse(request)

	// caso especifico para /metatags
	if (path === METATAGS_PATH) {
		const url = request.nextUrl.searchParams.get('url')
		if (!url) {
			return NextResponse.redirect(
				`${HOME_DOMAIN}/ferramentas${METATAGS_PATH}`,
				{ status: 301 },
			)
		}
	}

	return NextResponse.rewrite(new URL(`/api${fullPath}`, request.url))
}
