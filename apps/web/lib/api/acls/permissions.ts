import { Role } from '@/lib/drizzle/types'
import { ApiError } from '@/lib/api/errors'

export const PERMISSION_ACTIONS = [
	'workspaces.read',
	'workspaces.write',
	'domains.read',
	'domains.write',
	'webhooks.read',
	'webhooks.write',
] as const

export type PermissionAction = (typeof PERMISSION_ACTIONS)[number]

export const ROLE_PERMISSIONS: Array<{
	action: PermissionAction
	description: string
	roles: Role[]
}> = [
	{
		action: 'workspaces.read',
		description: 'access workspaces',
		roles: ['owner', 'member'],
	},
	{
		action: 'workspaces.write',
		description: 'update or delete current workspace',
		roles: ['owner'],
	},

	{
		action: 'webhooks.read',
		description: 'read webhooks',
		roles: ['owner', 'member'],
	},
	{
		action: 'webhooks.write',
		description: 'create, update, or delete webhooks',
		roles: ['owner'],
	},
]

export const getPermissionsByRole = (role: Role) => {
	const permissions: PermissionAction[] = []

	for (let i = 0; i < ROLE_PERMISSIONS.length; i += 1) {
		const rolePermission = ROLE_PERMISSIONS[i]

		if (rolePermission.roles.includes(role)) {
			permissions.push(rolePermission.action)
		}
	}

	return permissions
}

export const throwIfNoAccess = ({
	permissions = [],
	requiredPermissions = [],
	workspaceId,
}: {
	permissions: PermissionAction[]
	requiredPermissions: PermissionAction[]
	workspaceId: string
}) => {
	if (requiredPermissions.length === 0) {
		return
	}

	const missingPermissions = requiredPermissions.filter(
		permission => !permissions.includes(permission),
	)

	if (missingPermissions.length === 0) {
		return
	}

	throw new ApiError({
		code: 'forbidden',
		message: `The provided user does not have required permissions for this action. Having ${missingPermissions.join(' ')} permission would allow this requrest to continue.`,
	})
}
