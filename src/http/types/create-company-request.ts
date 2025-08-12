export type CreateCompanyRequest = {
  name: string
  isConsortium: boolean
  consortiumMembers?: Array<{
    companyId: string
    participation: number
    isLeader: boolean
  }>
}