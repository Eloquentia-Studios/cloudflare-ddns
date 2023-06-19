import 'dotenv/config'
import './services/cloudflare.js'
import './services/express.js'
import { scheduleTasks } from './services/scheduler.js'

console.log('Welcome to Cloudflare DDNS!')

scheduleTasks(true)
