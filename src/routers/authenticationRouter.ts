import authCheck from '../routes/authentication/authCheck.js'
import authLogin from '../routes/authentication/authLogin.js'
import { t } from '../services/trpc.js'

const authenticationRouter = t.router({
  authLogin,
  authCheck
})

export default authenticationRouter
