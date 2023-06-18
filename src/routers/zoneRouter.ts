import authenticatedProcedure from '../procedures/authenticatedProcedure.js'
import { getZones } from '../services/cloudflare.js'
import { t } from '../services/trpc.js'

const zoneRouter = t.router({
  getZones: authenticatedProcedure.query(async () => {
    return await getZones()
  })
})

export default zoneRouter
