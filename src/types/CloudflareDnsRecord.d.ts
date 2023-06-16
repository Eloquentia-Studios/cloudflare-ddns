export default interface CloudflareDnsRecord {
  id: string
  zone_id: string
  zone_name: string
  name: string
  type: string
  content: string
  proxiable: boolean
  proxied: boolean
  ttl: number
  locked: boolean
  meta: Meta
  comment: any
  tags: any[]
  created_on: string
  modified_on: string
  priority?: number
  data?: Data
}

export interface Meta {
  auto_added: boolean
  managed_by_apps: boolean
  managed_by_argo_tunnel: boolean
  source: string
}

export interface Data {
  name: string
  port: number
  priority: number
  proto: string
  service: string
  target: string
  weight: number
}
