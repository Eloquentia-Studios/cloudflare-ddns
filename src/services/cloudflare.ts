import type { Response } from 'node-fetch'
import fetch from 'node-fetch'
import type CloudflareDnsRecord from '../types/CloudflareDnsRecord.d'
import type CloudflareZoneListResponse from '../types/CloudflareResponse'
import type CloudflareZone from '../types/CloudflareZone.d'

/**
 * Verify an API token with Cloudflare.
 *
 * @param {string} token - The API token to verify.
 *
 * @returns {Promise<boolean>} - Whether the token is valid.
 * @throws {Error} - If the request fails.
 */
export const verifyToken = async (token: string): Promise<boolean> => (await request(token, 'GET', 'user/tokens/verify')).ok

/**
 * Get all zones from Cloudflare.
 *
 * @param {string} token - The API token to use.
 *
 * @returns {Promise<object[]>} - The zones.
 */
export const getZones = async (token: string): Promise<CloudflareZone[]> => {
  const response = await request(token, 'GET', 'zones')
  if (!response.ok) throw new Error('Failed to get zones from Cloudflare.')

  const zoneResponse = (await response.json()) as CloudflareZoneListResponse<CloudflareZone[]>
  return zoneResponse.result
}

/**
 * Get all DNS records for a zone from Cloudflare.
 *
 * @param {string} token - The API token to use.
 * @param {string} zoneId - The zone ID to use.
 */
export const getRecords = async (token: string, zoneId: string): Promise<CloudflareDnsRecord[]> => {
  const response = await request(token, 'GET', `zones/${zoneId}/dns_records`)
  if (!response.ok) throw new Error('Failed to get DNS records from Cloudflare.')

  const recordResponse = (await response.json()) as CloudflareZoneListResponse<CloudflareDnsRecord[]>
  return recordResponse.result
}

/**
 * Get all Zones with their DNS records from Cloudflare.
 *
 * @param {string} token - The API token to use.
 *
 * @returns {Promise<object>} - The Cloudflare data.
 */
export const getZonesAndRecords = async (token: string): Promise<(CloudflareZone & { records: CloudflareDnsRecord[] })[]> => {
  const zones = await getZones(token)
  const data: (CloudflareZone & { records: CloudflareDnsRecord[] })[] = []

  for (const zone of zones) {
    const zoneRecords = await getRecords(token, zone.id)
    data.push({ ...zone, records: zoneRecords })
  }

  return data
}

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
