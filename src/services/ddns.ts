import { readFile, writeFile } from 'fs/promises'
import { z } from 'zod'
import fileExists from '../libs/fileExists.js'
import { getRecord, recordExists, resetCloudflareCache, updateRecord } from './cloudflare.js'
import { getPublicIP } from './ip.js'
import { addTask, runTaskNow } from './scheduler.js'

const DDNSRecordsPath = (process.env.DATA_DIR ?? './data') + '/ddns.json'

const DDNSSchema = z
  .object({
    zoneId: z.string(),
    recordId: z.string()
  })
  .array()

type DDNSRecord = z.infer<typeof DDNSSchema>[number]

const DDNSRecords: Set<string> = new Set()

export const updateRecordDDNSStatus = async (zoneId: string, recordId: string, ddnsStatus: boolean) => {
  const recordKey = combineRecordKey(zoneId, recordId)

  if (ddnsStatus) DDNSRecords.add(recordKey)
  if (!ddnsStatus) DDNSRecords.delete(recordKey)

  initDDNSRecordsSave()
}

export const getRecordDDNSStatus = (zoneId: string, recordId: string) => DDNSRecords.has(combineRecordKey(zoneId, recordId))

let DDNSRecordsSaveTimeout: NodeJS.Timeout | undefined
const initDDNSRecordsSave = () => {
  if (DDNSRecordsSaveTimeout) clearTimeout(DDNSRecordsSaveTimeout)

  DDNSRecordsSaveTimeout = setTimeout(() => saveDDNSRecords(), 10000)
}

const combineRecordKey = (zoneId: string, recordId: string) => `${zoneId}:${recordId}`
const splitRecordKey = (recordKey: string) => recordKey.split(':')

const loadDDNSRecords = async () => {
  if (!(await fileExists(DDNSRecordsPath))) return []

  const data = await readFile(DDNSRecordsPath, 'utf-8')
  const parsedData = JSON.parse(data)
  if (!(await DDNSSchema.safeParseAsync(parsedData)).success) throw new Error('Invalid DDNS records file. Delete it and restart the server.')

  parsedData.forEach((record: DDNSRecord) => DDNSRecords.add(combineRecordKey(record.zoneId, record.recordId)))
}

const saveDDNSRecords = () => {
  const ddnsRecords: DDNSRecord[] = Array.from(DDNSRecords).map((recordKey) => {
    const [zoneId, recordId] = splitRecordKey(recordKey)
    return { zoneId, recordId }
  })

  writeFile(DDNSRecordsPath, JSON.stringify(ddnsRecords), 'utf-8')

  runTaskNow('DDNS')
}

loadDDNSRecords()

const runDDNS = async () => {
  const ip = await getPublicIP()
  resetCloudflareCache()

  for (const recordKey of DDNSRecords) {
    const [zoneId, recordId] = splitRecordKey(recordKey)

    if (!(await recordExists(zoneId, recordId))) {
      updateRecordDDNSStatus(zoneId, recordId, false)
      continue
    }

    const record = await getRecord(zoneId, recordId)
    if (record.content === ip) continue
    if (!['A', 'AAAA'].includes(record.type)) continue

    console.info(`Updating ${record.name} (${record.content}) to ${ip}.`)
    await updateRecord(zoneId, recordId, { type: record.type, name: record.name, content: ip, ttl: record.ttl, proxied: record.proxied })
    console.info(`Updated ${record.name} (${record.content}) to ${ip}.`)
  }
}

addTask({
  name: 'DDNS',
  onStartup: true,
  startupOffset: 10 * 1000,
  interval: 5 * 60 * 1000,
  retryInterval: 30 * 1000,
  task: runDDNS
})
