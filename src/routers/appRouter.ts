import { t } from '../services/trpc.js'
import authenticationRouter from './authenticationRouter.js'
import cloudflareRouter from './cloudflareRouter.js'
import infoRouter from './infoRouter.js'

export const appRouter = t.mergeRouters(authenticationRouter, cloudflareRouter, infoRouter)

export type AppRouter = typeof appRouter
