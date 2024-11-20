import { NextResponse } from 'next/server'
import { ZodError, z } from 'zod'
import { generateErrorMessage } from 'zod-error'

export const ErrorCode = z.enum([
	'bad_request',
	'unauthorized',
	'forbidden',
	'not_found',
	'invite_pending',
	'invite_expired',
	'unprocessable_entity',
	'rate_limit_exceeded',
	'internal_server_error',
])

const errorCodeToHttpStatus: Record<ErrorCodes, number> = {
	bad_request: 400,
	unauthorized: 401,
	forbidden: 403,
	not_found: 404,
	invite_pending: 409,
	invite_expired: 410,
	unprocessable_entity: 422,
	rate_limit_exceeded: 429,
	internal_server_error: 500,
}

const ErrorSchema = z.object({
	error: z.object({
		code: ErrorCode,
		message: z.string(),
		doc_url: z.string().optional(),
	}),
})

export type ErrorResponse = z.infer<typeof ErrorSchema>
export type ErrorCodes = z.infer<typeof ErrorCode>

export class ApiError extends Error {
	public readonly code: ErrorCodes
	public readonly docUrl?: string

	constructor({
		code,
		message,
		docUrl,
	}: {
		code: ErrorCodes
		message: string
		docUrl?: string
	}) {
		super(message)
		this.code = code
		this.docUrl = docUrl ?? `${docErrorUrl}#${code.replace('_', '-')}`
	}
}

const docErrorUrl = `https://example.com/docs/api-reference/errors`

export function fromZodError(error: ZodError): ErrorResponse {
	return {
		error: {
			code: 'unprocessable_entity',
			message: generateErrorMessage(error.issues, {
				maxErrors: 1,
				delimiter: {
					component: ': ',
				},
				path: {
					enabled: true,
					type: 'objectNotation',
					label: '',
				},
				code: {
					enabled: true,
					label: '',
				},
				message: {
					enabled: true,
					label: '',
				},
			}),
			doc_url: `${docErrorUrl}#unprocessable-entity`,
		},
	}
}

export function handleApiError(error: any): ErrorResponse & { status: number } {
	console.error('API error occurred', error.message)

	// ZodError
	if (error instanceof ZodError) {
		return {
			...fromZodError(error),
			status: errorCodeToHttpStatus.unprocessable_entity,
		}
	}

	// ApiError
	if (error instanceof ApiError) {
		return {
			error: {
				code: error.code,
				message: error.message,
				doc_url: error.docUrl,
			},
			status: errorCodeToHttpStatus[error.code],
		}
	}

	// Fallback
	// Erros nao tratados ou desconhecidos, nao mostramos o erro original para o usuario
	return {
		error: {
			code: 'internal_server_error',
			message:
				'An internal server error occurred. Please contact our support if the problem persists.',
			doc_url: `${docErrorUrl}#internal-server-error`,
		},
		status: 500,
	}
}

export function handleAndReturnErrorResponse(
	err: unknown,
	headers?: Record<string, string>,
) {
	const { error, status } = handleApiError(err)
	return NextResponse.json<ErrorResponse>({ error }, { headers, status })
}
