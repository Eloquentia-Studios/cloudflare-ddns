import authenticatedProcedure from '../procedures/authenticatedProcedure.js'
import { getZonesAndRecordCounts } from '../services/cloudflare.js'
import { t } from '../services/trpc.js'

const zoneRouter = t.router({
  getZones: authenticatedProcedure.query(async () => {
    return await getZonesAndRecordCounts()
  })
})

export default zoneRouter
