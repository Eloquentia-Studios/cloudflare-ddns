import type { Request, Response } from 'express'
import { verifyToken } from '../../services/token.js'

/**
 * GET /api/authentication/check - Check if the client is authenticated.
 * Check if the client is authenticated by checking if the given JWT token
 * is valid and the IP address of the client matches the IP address in the token.
 *
 * @param req Express request.
 * @param res Express response.
 */
const routeAuthenticationCheck = async (req: Request, res: Response) => {
  try {
    // Get client IP address.
    const ip = req.ip
    if (!ip) return res.status(401).json({ message: 'Invalid IP address.' })

    // Get token from Authorization header.
    const token = req.headers.authorization
    if (!token) return res.status(401).json({ message: 'Invalid token.' })

    // Verify the token.
    const payload = verifyToken(token.split(' ')[1], ip)
    if (!payload) return res.status(401).json({ message: 'Invalid token.' })

    // Return the payload.
    return res.status(200).json(payload)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

export default routeAuthenticationCheck
