import type { Response } from 'node-fetch'
import fetch from 'node-fetch'

/**
 * Verify an API token with Cloudflare.
 *
 * @param {string} token - The API token to verify.
 *
 * @returns {Promise<boolean>} - Whether the token is valid.
 */
export const verifyToken = async (token: string): Promise<boolean> => (await request(token, 'GET', 'user/tokens/verify')).ok

/**
 * Send authenticated requests to the Cloudflare API.
 *
 * @param {string} token - The API token to use.
 * @param {string} method - The HTTP method to use.
 * @param {string} endpoint - The API endpoint to use.
 * @param {object} [headers] - The request headers.
 * @param {object} [body] - The request body.
 *
 * @returns {Promise<Response>} - The response body.
 */
const request = async (token: string, method: string, endpoint: string, headers?: object, body?: object): Promise<Response> => {
  let response: Response | undefined
  let tries = 0

  while (!response && tries < 10) {
    try {
      response = await fetch(`https://api.cloudflare.com/client/v4/${endpoint}`, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify(body)
      })
    } catch (err) {
      tries++
      continue
    }
  }

  if (!response) throw new Error('Failed to send request to Cloudflare API.')
  return response
}
