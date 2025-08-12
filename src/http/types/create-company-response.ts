export type CreateCompanyResponse = {
    id: string
    createdAt: string
    consortiumMembers?: Array<{
      companyId: string
    }>
  }