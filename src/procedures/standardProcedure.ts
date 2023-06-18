import checkIP from '../middleware/checkIP.js'
import { t } from '../services/trpc.js'

const ipCheckedProcedure = t.procedure.use(checkIP)
export default ipCheckedProcedure
