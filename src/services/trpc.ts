import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'

export const t = initTRPC.create()

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({})
export type Context = inferAsyncReturnType<typeof createContext>
