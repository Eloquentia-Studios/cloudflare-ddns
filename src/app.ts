import { config } from 'dotenv'
import { verifyToken } from './services/cloudflare.js'
import './services/express.js'
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

// Get all Cloudflare data.
//let cloudflareData = await getZonesAndRecords(API_KEY)
//let ip = await getPublicIP()

console.log('Welcome to Cloudflare DDNS!')
