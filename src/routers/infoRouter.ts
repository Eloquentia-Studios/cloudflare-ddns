import authenticatedProcedure from '../procedures/authenticatedProcedure.js'
import { getPublicIP, getTimeOfLastIPChange } from '../services/ip.js'
import { t } from '../services/trpc.js'

const infoRouter = t.router({
  getPublicIP: authenticatedProcedure.query(() => getPublicIP()),
  getTimeOfLastIPChange: authenticatedProcedure.query(() => getTimeOfLastIPChange())
})

export default infoRouter
