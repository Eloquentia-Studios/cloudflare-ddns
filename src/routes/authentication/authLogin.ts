import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import standardProcedure from '../../procedures/standardProcedure.js'
import { generateToken } from '../../services/token.js'

const authLogin = standardProcedure.input(z.string()).mutation(({ input: password, ctx }) => {
  if (password !== process.env.PASSWORD) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid password.' })
  return generateToken(ctx.ip)
})

export default authLogin
