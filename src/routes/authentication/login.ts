import type { Request, Response } from 'express'
import getClientIP from '../../libs/getClientIP.js'
import { generateToken } from '../../services/token.js'

/**
 * POST /api/authentication/login - Authenticate client.
 * Check if the given password matches the password in the environment variables,
 * if it does, return a JWT token, otherwise return 401.
 *
 * @param req Express request.
 * @param res Express response.
 */
const routeAuthenticationLogin = async (req: Request, res: Response) => {
  try {
    // Check if the given password matches the password in the environment variables.
    const { password } = req.body
    if (password !== process.env.PASSWORD) return res.status(401).json({ message: 'Invalid password.' })

    // Get client IP address.
    const ip = getClientIP(req)
    if (!ip) return res.status(401).json({ message: 'Invalid IP address.' })

    // Generate a JWT token with the client IP address as the payload.
    const token = generateToken(ip)
    return res.status(200).json({ token })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

export default routeAuthenticationLogin
