import type { Request } from 'express'

/**
 * Get the IP address of the client.
 *
 * @param req Express request.
 * @returns IP address of the client.
 */
const getClientIP = (req: Request) => {
  if (req.headers['cf-connecting-ip']) return (req.headers['cf-connecting-ip'] as string).split(',')[0]
  if (req.headers['x-real-ip']) return (req.headers['x-real-ip'] as string).split(',')[0]
  if (req.headers['x-forwarded-for']) return (req.headers['x-forwarded-for'] as string).split(',')[0]
  return req.socket.remoteAddress
}

export default getClientIP
