import standardProcedure from '../../procedures/standardProcedure.js'
import { verifyToken } from '../../services/token.js'

const authCheck = standardProcedure.query(({ ctx }) => {
  const token = ctx.req.headers.authorization
  if (!token) return false

  const payload = verifyToken(token.split(' ')[1], ctx.ip)
  if (!payload) return false

  return true
})

export default authCheck
