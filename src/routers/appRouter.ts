import { t } from '../services/trpc.js'
import authenticationRouter from './authenticationRouter.js'

export const appRouter = t.mergeRouters(authenticationRouter)

export type AppRouter = typeof appRouter
