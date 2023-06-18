import { Router } from 'express'
import routeAuthenticationLogin from '../routes/authentication/login.js'

const authenticationRouter = Router()

// POST /api/authentication/login - Authenticate client.
authenticationRouter.post('/login', routeAuthenticationLogin)

export default authenticationRouter
