export type GetCompaniesResponse = Array<{
  id: string
  name: string
  isConsortium: boolean
  leaderName?: string | null
  createdAt: string
  updatedAt: string
}>
