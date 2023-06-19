import { t } from '../services/trpc.js'
import authenticationRouter from './authenticationRouter.js'
import zoneRouter from './zoneRouter.js'

export const appRouter = t.mergeRouters(authenticationRouter, zoneRouter)

export type AppRouter = typeof appRouter
