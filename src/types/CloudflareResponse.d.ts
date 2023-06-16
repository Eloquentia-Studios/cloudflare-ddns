export default interface CloudflareZoneListResponse<T> {
  errors: any[]
  messages: any[]
  result: T
  result_info: ResultInfo
  success: boolean
}

export interface ResultInfo {
  page: number
  per_page: number
  total_pages: number
  count: number
  total_count: number
}
