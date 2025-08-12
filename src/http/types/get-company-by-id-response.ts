export type GetCompanyByIdResponse = {
  id: string
  name: string
  isConsortium: boolean
    consortiumMembers?: Array<{
    companyId: string
    companyName: string
    participation: string
    isLeader: boolean
  }>
  createdAt: string
  updatedAt: string
}