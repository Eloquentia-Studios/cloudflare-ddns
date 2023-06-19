import { t } from '../services/trpc.js'
import authenticationRouter from './authenticationRouter.js'
import cloudflareRouter from './cloudflareRouter.js'

export const appRouter = t.mergeRouters(authenticationRouter, cloudflareRouter)

export type AppRouter = typeof appRouter
