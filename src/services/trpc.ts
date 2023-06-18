import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import getClientIP from '../libs/getClientIP.js'

export const createContext = async ({ req }: trpcExpress.CreateExpressContextOptions) => ({
  req,
  ip: getClientIP(req)
})

export type Context = inferAsyncReturnType<typeof createContext>

export const t = initTRPC.context<Context>().create()
