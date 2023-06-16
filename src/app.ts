import { config } from 'dotenv'
import getPublicIP from './libs/getPublicIP.js'
import { getRecords, getZones, verifyToken } from './services/cloudflare.js'
config()

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

// Get all zones.
const zones = await getZones(API_KEY)
console.log(`Available Zones:\n${zones.map((zone) => zone.name).join(', ')}`)

// Get all DNS records.
for (const zone of zones) {
  const records = await getRecords(API_KEY, zone.id)
  console.log(`\n${zone.name}:\n${records.map((record) => `- ${record.name} : ${record.content}`).join('\n')}`)
}

// Get the public IP address.
const ip = await getPublicIP()
console.log(`\nPublic IP: ${ip}`)

console.log('Welcome to Cloudflare DDNS!')
