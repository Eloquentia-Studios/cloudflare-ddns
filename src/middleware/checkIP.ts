import { TRPCError } from '@trpc/server'
import { t } from '../services/trpc.js'

const checkIP = t.middleware(async ({ ctx, next }) => {
  if (!ctx.ip) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid IP address.' })

  // The weird type exists because typescript did not understand that the ctx object has a valid ip property.
  return next({ ctx } as { ctx: typeof ctx & { ip: string } })
})

export default checkIP
