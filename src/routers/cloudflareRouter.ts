import { z } from 'zod'
import authenticatedProcedure from '../procedures/authenticatedProcedure.js'
import updateRecordDDNSStatus from '../routes/cloudflare/updateRecordDDNSStatus.js'
import { getRecords, getZonesAndRecordCounts } from '../services/cloudflare.js'
import { t } from '../services/trpc.js'

const cloudflareRouter = t.router({
  getZones: authenticatedProcedure.query(() => getZonesAndRecordCounts()),
  getRecords: authenticatedProcedure.input(z.string()).query(({ input: zoneId }) => getRecords(zoneId)),
  updateRecordDDNSStatus
})

export default cloudflareRouter
