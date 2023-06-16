export default interface CloudflareZone {
  id: string
  name: string
  status: string
  paused: boolean
  type: string
  development_mode: number
  name_servers: string[]
  original_name_servers?: string[]
  original_registrar?: string
  original_dnshost: any
  modified_on: string
  created_on: string
  activated_on: string
  meta: Meta
  owner: Owner
  account: Account
  tenant: Tenant
  tenant_unit: TenantUnit
  permissions: string[]
  plan: Plan
}

export interface Meta {
  step: number
  custom_certificate_quota: number
  page_rule_quota: number
  phishing_detected: boolean
  multiple_railguns_allowed: boolean
}

export interface Owner {
  id: any
  type: string
  email: any
}

export interface Account {
  id: string
  name: string
}

export interface Tenant {
  id: any
  name: any
}

export interface TenantUnit {
  id: any
}

export interface Plan {
  id: string
  name: string
  price: number
  currency: string
  frequency: string
  is_subscribed: boolean
  can_subscribe: boolean
  legacy_id: string
  legacy_discount: boolean
  externally_managed: boolean
}
