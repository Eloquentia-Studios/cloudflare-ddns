import checkIP from '../middleware/checkIP.js'
import { t } from '../services/trpc.js'

const standardProcedure = t.procedure.use(checkIP)
export default standardProcedure
