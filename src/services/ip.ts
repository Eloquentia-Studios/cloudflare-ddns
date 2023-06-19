import { readFile, writeFile } from 'fs/promises'
import { publicIpv4 } from 'public-ip'
import { z } from 'zod'
import fileExists from '../libs/fileExists.js'

const PublicIPPath = (process.env.DATA_DIR ?? './data') + '/publicIP.json'
let publicIP: string | undefined
let lastIPChange: number | undefined

export const getPublicIP = async () => {
  const ip = await publicIpv4()

  if (ip !== publicIP) setNewPublicIP(ip)

  return ip
}

export const getTimeOfLastIPChange = () => lastIPChange

const setNewPublicIP = (ip: string) => {
  publicIP = ip
  lastIPChange = Date.now()

  savePublicIP()
}

const savePublicIP = () => {
  if (!publicIP) return

  const data = JSON.stringify({ publicIP, lastIPChange })
  writeFile(PublicIPPath, data, 'utf-8')
}

const loadPublicIP = async () => {
  if (!(await fileExists(PublicIPPath))) return getPublicIP()

  const data = await readFile(PublicIPPath, 'utf-8')
  const parsedData = JSON.parse(data)

  const validIP = (await z.string().ip().safeParseAsync(parsedData.publicIP)).success
  const validDate = (await z.number().safeParseAsync(parsedData.lastIPChange)).success

  if (!validIP || !validDate) throw new Error('Invalid public IP file. Delete it and restart the server.')

  publicIP = parsedData.publicIP
  lastIPChange = parsedData.lastIPChange
}

loadPublicIP()
