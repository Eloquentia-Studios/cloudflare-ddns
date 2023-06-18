import isAuthenticated from '../middleware/isAuthenticated.js'
import standardProcedure from './standardProcedure.js'

const authenticatedProcedure = standardProcedure.use(isAuthenticated)
export default authenticatedProcedure
