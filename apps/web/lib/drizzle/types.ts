import { users, userRoles } from './user.schema'

export type User = typeof users.$inferSelect

export type Role = (typeof userRoles.enumValues)[number]
