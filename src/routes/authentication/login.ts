import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import ipCheckedProcedure from '../../middleware/checkIP.js'
import { generateToken } from '../../services/token.js'

const routeAuthenticationLogin = ipCheckedProcedure.input(z.string()).mutation(({ input: password, ctx }) => {
  if (password !== process.env.PASSWORD) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid password.' })
  return generateToken(ctx.ip)
})

export default routeAuthenticationLogin
