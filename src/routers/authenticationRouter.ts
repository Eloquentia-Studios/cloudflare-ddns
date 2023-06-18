import routeAuthenticationCheck from '../routes/authentication/check.js'
import routeAuthenticationLogin from '../routes/authentication/login.js'
import { t } from '../services/trpc.js'

const authenticationRouter = t.router({
  authLogin: routeAuthenticationLogin,
  authCheck: routeAuthenticationCheck
})

export default authenticationRouter
