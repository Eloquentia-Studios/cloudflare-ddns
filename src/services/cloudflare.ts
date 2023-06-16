import fetch from 'node-fetch'

/**
 * Verify an API token with Cloudflare.
 *
 * @param {string} token - The API token to verify.
 * @returns {Promise<boolean>} - Whether the token is valid.
 */
export const verifyToken = async (token: string): Promise<boolean> => {
  const response = await fetch('https://api.cloudflare.com/client/v4/user/tokens/verify', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.ok
}
