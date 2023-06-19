import { z } from 'zod'
import authenticatedProcedure from '../procedures/authenticatedProcedure.js'
import { getRecords, getZonesAndRecordCounts } from '../services/cloudflare.js'
import { t } from '../services/trpc.js'

const zoneRouter = t.router({
  getZones: authenticatedProcedure.query(() => getZonesAndRecordCounts()),
  getRecords: authenticatedProcedure.input(z.string()).query(({ input }) => getRecords(input))
})

export default zoneRouter
