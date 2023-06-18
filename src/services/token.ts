import { randomBytes } from 'crypto'
import jwt from 'jsonwebtoken'

// Get static secret from env or generate a random one.
const secret: string = process.env.JWT_SECRET || randomBytes(64).toString('hex')

/**
 * Generate a JWT token with the given IP address as the payload
 * along with other payload data.
 *
 * @param ip IP address of the client.
 * @param payload Other payload data.
 * @returns JWT token.
 */
export const generateToken = (ip: string, payload: Record<string, unknown> = {}, expiresIn: string = '24h') => {
  return jwt.sign({ ip, ...payload }, secret, { expiresIn })
}

/**
 * Verify the given JWT token along with the IP address of the client.
 *
 * @param token JWT token.
 * @param ip IP address of the client.
 * @returns Payload of the JWT token if it is valid, null otherwise.
 */
export const verifyToken = (token: string, ip: string) => {
  try {
    const payload = jwt.verify(token, secret) as { ip: string }
    return payload.ip === ip ? payload : null
  } catch (error) {
    return null
  }
}
