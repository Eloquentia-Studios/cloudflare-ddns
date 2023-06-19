import type { Response } from 'node-fetch'
import fetch from 'node-fetch'
import type CloudflareDnsRecord from '../types/CloudflareDnsRecord.d'
import type CloudflareResponse from '../types/CloudflareResponse.d'
import type CloudflareZone from '../types/CloudflareZone.d'
import { getRecordDDNSStatus } from './ddns.js'

/**
 * Verify an API token with Cloudflare.
 *
 * @param {string} token - The API token to verify.
 *
 * @returns {Promise<boolean>} - Whether the token is valid.
 * @throws {Error} - If the request fails.
 */
export const verifyToken = async (token: string): Promise<boolean> =>
  cloudflareRequest('GET', 'user/tokens/verify', undefined, undefined, token, 0)
    .then(() => true)
    .catch(() => false)

/**
 * Get all zones from Cloudflare.
 *
 * @returns {Promise<object[]>} - The zones.
 */
export const getZones = async (): Promise<CloudflareZone[]> => cloudflareRequest<CloudflareZone[]>('GET', 'zones')

/**
 * Get a zone from Cloudflare.
 */
export const getZone = async (zoneId: string): Promise<CloudflareZone> => cloudflareRequest<CloudflareZone>('GET', `zones/${zoneId}`)

/**
 * Check if a zone exists on Cloudflare.
 */
export const zoneExists = async (zoneId: string): Promise<boolean> =>
  getZone(zoneId)
    .then(() => true)
    .catch(() => false)

/**
 * Get all DNS records for a zone from Cloudflare.
 */
export const getRecords = async (zoneId: string): Promise<(CloudflareDnsRecord & { ddnsStatus: boolean })[]> => {
  const records = await cloudflareRequest<CloudflareDnsRecord[]>('GET', `zones/${zoneId}/dns_records`)

  return records.map((record) => ({
    ...record,
    ddnsStatus: getRecordDDNSStatus(zoneId, record.id)
  }))
}

/**
 * Get a DNS record for a zone from Cloudflare.
 */
export const getRecord = async (zoneId: string, recordId: string): Promise<CloudflareDnsRecord & { ddnsStatus: boolean }> => {
  const record = await cloudflareRequest<CloudflareDnsRecord>('GET', `zones/${zoneId}/dns_records/${recordId}`)

  return {
    ...record,
    ddnsStatus: getRecordDDNSStatus(zoneId, record.id)
  }
}

/**
 * Check if a DNS record exists on Cloudflare.
 */
export const recordExists = async (zoneId: string, recordId: string): Promise<boolean> =>
  getRecord(zoneId, recordId)
    .then(() => true)
    .catch(() => false)

/**
 * Update a DNS record on Cloudflare.
 */
export const updateRecord = async (zoneId: string, recordId: string, data: { type: string; name: string; content: string; ttl: number; proxied: boolean }): Promise<CloudflareDnsRecord> =>
  cloudflareRequest<CloudflareDnsRecord>('PUT', `zones/${zoneId}/dns_records/${recordId}`, undefined, { ...data }, undefined, 0)

/**
 * Get all Zones with their DNS records from Cloudflare.
 *
 * @returns {Promise<any>} - The Cloudflare data.
 */
export const getZonesAndRecords = async (): Promise<(CloudflareZone & { records: CloudflareDnsRecord[] })[]> => {
  const zones = await getZones()
  const data: (CloudflareZone & { records: CloudflareDnsRecord[] })[] = []

  for (const zone of zones) {
    const zoneRecords = await getRecords(zone.id)
    data.push({ ...zone, records: zoneRecords })
  }

  return data
}

/**
 * Get all Zones with the number of DNS records from Cloudflare.
 */
export const getZonesAndRecordCounts = async (): Promise<(CloudflareZone & { recordCount: number })[]> => {
  const zonesAndRecords = await getZonesAndRecords()
  return zonesAndRecords.map((zone) => ({ ...zone, recordCount: zone.records.length }))
}

let cache: Map<string, { result: any; time: Date }> = new Map()
export const resetCloudflareCache = () => cache.clear()

const cloudflareRequest = async <T>(method: string, endpoint: string, headers?: object, body?: object, token?: string, cacheTimeSeconds: number = 60 * 5): Promise<T> => {
  const cacheExists = cache.has(endpoint)
  const cacheExpired = cacheExists && cache.get(endpoint)!.time.getTime() < Date.now() - 1000 * cacheTimeSeconds
  if (cacheExists && !cacheExpired) return cache.get(endpoint)!.result

  const response = await retriedRequest(method, endpoint, headers, body, token)

  if (!response) throw new Error('Failed to send request to Cloudflare API.')
  if (!response.ok) throw new Error(`Failed to send request to Cloudflare API on path ${endpoint} with status ${response.status}.`)

  const json = (await response.json()) as CloudflareResponse<T>

  if (cacheTimeSeconds > 0) cache.set(endpoint, { result: json.result, time: new Date() })
  return json.result
}

/**
 * Send multiple requests to the Cloudflare API until one succeeds
 * or the maximum number of tries is reached.
 */
const retriedRequest = async (method: string, endpoint: string, headers?: object, body?: object, token?: string) => {
  let response: Response | undefined
  let tries = 0

  while (!response && tries < 10) {
    try {
      response = await fetch(`https://api.cloudflare.com/client/v4/${endpoint}`, {
        method,
        headers: {
          'Authorization': `Bearer ${token ?? API_KEY}`,
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

  return response
}

/**
 * Load the API key from the .env file.
 */
const API_KEY = await (async () => {
  // Get the API key from the environment variables.
  const API_KEY = process.env.CLOUDFLARE_API_KEY
  if (!API_KEY) {
    console.error('No Cloudflare API key found in environment variables.')
    process.exit(1)
  }

  // Verify the API key.
  const valid = await verifyToken(API_KEY)
  if (!valid) {
    console.error('Invalid Cloudflare API key.')
    process.exit(1)
  }

  return API_KEY
})()
