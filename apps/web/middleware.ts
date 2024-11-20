import { API_HOSTNAMES, APP_HOSTNAMES, LP_HOSTNAMES } from '@repo/utils'
import { NextResponse, type NextRequest } from 'next/server'
import ApiMiddleware from '@/lib/middleware/api'
import AppMiddleware from '@/lib/middleware/app'
import { parse } from '@/lib/middleware/helpers'
import LpMiddleware from './lib/middleware/lp'

export async function middleware(request: NextRequest) {
	const { domain } = parse(request)

	// para landing pages
	if (LP_HOSTNAMES.has(domain)) {
		return LpMiddleware(request)
	}

	// para o app
	if (APP_HOSTNAMES.has(domain)) {
		return AppMiddleware(request)
	}

	// para a api
	if (API_HOSTNAMES.has(domain)) {
		return ApiMiddleware(request)
	}

	// redirect padrao
	// if (domain === SHORT_DOMAIN && DEFAULT_REDIRECTS[key]) {
	// 	return NextResponse.redirect(DEFAULT_REDIRECTS[key])
	// }

	return NextResponse.next({ request })
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * Feel free to modify this pattern to include more paths.
		 */
		'/((?!api/|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
}
