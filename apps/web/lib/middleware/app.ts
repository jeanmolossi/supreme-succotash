import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { getOnboardingStep, getUserByID, parse } from './helpers'
import serverAppConfig from '@/config/server-app-config'

const { SUPABASE_URL, ANON_KEY } = serverAppConfig

const LOGIN_PAGE = '/acessar'
const REGISTER_PAGE = '/cadastro'
const CALLBACK_PAGE = '/auth/callback'
const SETTINGS_PATH = '/settings/'
const ONBOARDING_PATH = '/onboarding'

const ONBOARDING_COMPLETED_STEP = 'finalizado'

export default async function AppMiddleware(request: NextRequest) {
	const { path, fullPath } = parse(request)
	let response = NextResponse.next({ request })

	const supabase = createServerClient(SUPABASE_URL, ANON_KEY, {
		cookies: {
			getAll: () => request.cookies.getAll(),
			setAll: cookiesToSet => {
				cookiesToSet.forEach(({ name, value }) =>
					request.cookies.set(name, value),
				)

				response = NextResponse.next({ request })
				cookiesToSet.forEach(({ name, value, options }) =>
					response.cookies.set(name, value, options),
				)
			},
		},
	})

	const {
		data: { user: userProvided },
	} = await supabase.auth.getUser()
	const user = await getUserByID(userProvided)

	const userCreatedLessThanADayAgo =
		new Date(user?.created_at || 0).getTime() >
		Date.now() - 60 * 60 * 24 * 1000

	const isWorkspaceInvite = request.nextUrl.searchParams.get('invite')

	const isLoginPath = path === LOGIN_PAGE
	const isRegisterPath = path === REGISTER_PAGE
	const isCallbackPage = path === CALLBACK_PAGE

	// se o usr nao esta logado e nao esta em pagina de login ou de registro
	if (!user && !isLoginPath && !isRegisterPath && !isCallbackPage) {
		const whereToGo =
			path === '/' ? '' : `?redir_to=${encodeURIComponent(fullPath)}`
		return NextResponse.redirect(
			new URL(`/app${LOGIN_PAGE}${whereToGo}`, request.url),
		)

		// se o usuario ta logado
	} else if (user) {
		// /onboarding é a página de "boas vindas" e introducao ao sistema
		if (path === ONBOARDING_PATH) {
			// devemos ter outro middleware sendo aplicado aqui
			/**
			 * Intencao
			 * Onboarding redirects
			 *
			 * - Usuario foi criado a menos que um dia
			 * - Usuario nao foi convidado à um workspace
			 * - O caminho nao comeca com /onboarding
			 * - O usuario nao completou o /onboarding
			 */
		} else if (
			userCreatedLessThanADayAgo &&
			!isWorkspaceInvite &&
			!path.startsWith(ONBOARDING_PATH) &&
			(await getOnboardingStep(user)) !== ONBOARDING_COMPLETED_STEP
		) {
			let step = await getOnboardingStep(user)
			if (!step) {
				return NextResponse.redirect(
					new URL(`/app${ONBOARDING_PATH}`, request.url),
				)
			} else if (step === ONBOARDING_COMPLETED_STEP) {
				// redireciona para uma pagina dashboard default
			}

			return NextResponse.redirect(
				new URL(`/app${ONBOARDING_PATH}`, request.url),
			)
			// se o path é / ou /acessar ou /cadastro, redireciona para o dashboard default
		} else if (
			['/', LOGIN_PAGE, REGISTER_PAGE].includes(path) ||
			path.startsWith(SETTINGS_PATH)
		) {
			return NextResponse.redirect(
				new URL(`/app${ONBOARDING_PATH}`, request.url),
			)
		}
	}

	return NextResponse.rewrite(new URL(`/app${fullPath}`, request.url))
}
