import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import authenticatedProcedure from '../../procedures/authenticatedProcedure.js'
import { recordExists, zoneExists } from '../../services/cloudflare.js'
import { updateRecordDDNSStatus as updateRecordDDNSStatusInFile } from '../../services/ddns.js'

const updateRecordDDNSStatus = authenticatedProcedure.input(z.object({ zoneId: z.string(), recordId: z.string(), ddnsStatus: z.boolean() })).mutation(async ({ input: { zoneId, recordId, ddnsStatus } }) => {
  if (!(await zoneExists(zoneId))) throw new TRPCError({ code: 'NOT_FOUND', message: 'Zone not found.' })
  if (!(await recordExists(zoneId, recordId))) throw new TRPCError({ code: 'NOT_FOUND', message: 'Record not found.' })

  await updateRecordDDNSStatusInFile(zoneId, recordId, ddnsStatus)
})

export default updateRecordDDNSStatus
