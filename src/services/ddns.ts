import { readFile, writeFile } from 'fs/promises'
import { z } from 'zod'
import fileExists from '../libs/fileExists.js'

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

  DDNSRecordsSaveTimeout = setTimeout(() => saveDDNSRecords(), 2500)
}

const combineRecordKey = (zoneId: string, recordId: string) => `${zoneId}:${recordId}`

const loadDDNSRecords = async () => {
  if (!(await fileExists(DDNSRecordsPath))) return []

  const data = await readFile(DDNSRecordsPath, 'utf-8')
  const parsedData = JSON.parse(data)
  if (!(await DDNSSchema.safeParseAsync(parsedData)).success) throw new Error('Invalid DDNS records file. Delete it and restart the server.')

  parsedData.forEach((record: DDNSRecord) => DDNSRecords.add(combineRecordKey(record.zoneId, record.recordId)))
}

const saveDDNSRecords = () => {
  const ddnsRecords: DDNSRecord[] = Array.from(DDNSRecords).map((recordKey) => {
    const [zoneId, recordId] = recordKey.split(':')
    return { zoneId, recordId }
  })

  writeFile(DDNSRecordsPath, JSON.stringify(ddnsRecords), 'utf-8')
}

loadDDNSRecords()
