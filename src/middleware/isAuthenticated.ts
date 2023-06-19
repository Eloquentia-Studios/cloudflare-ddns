import { TRPCError } from '@trpc/server'
import { verifyToken } from '../services/token.js'
import { t } from '../services/trpc.js'

const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.ip) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid IP address.' })

  const token = ctx.req.headers.authorization
  if (!token) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Missing token.' })

  const payload = verifyToken(token.split(' ')[1], ctx.ip)
  if (!payload) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid token.' })

  return next({ ctx })
})

export default isAuthenticated
