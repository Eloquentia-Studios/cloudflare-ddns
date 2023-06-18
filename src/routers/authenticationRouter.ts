import { Router } from 'express'
import routeAuthenticationCheck from '../routes/authentication/check.js'
import routeAuthenticationLogin from '../routes/authentication/login.js'

const authenticationRouter = Router()

// POST /api/authentication/login - Authenticate client.
authenticationRouter.post('/login', routeAuthenticationLogin)

// GET /api/authentication/check - Check if the client is authenticated.
authenticationRouter.get('/check', routeAuthenticationCheck)

export default authenticationRouter
