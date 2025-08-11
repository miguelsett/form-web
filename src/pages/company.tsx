import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

type CompanyBase = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

type RegularCompany = CompanyBase & {
  isConsortium: false
  consortiumMembers?: never
}

type ConsortiumMember = {
  consortiumId: string
  companyId: string
  participation: string // ex.: "70.00"
  isLeader: boolean
  createdAt: string
  updatedAt: string
}

type ConsortiumCompany = CompanyBase & {
  isConsortium: true
  consortiumMembers: ConsortiumMember[]
}

export type GetCompanyResponse = RegularCompany | ConsortiumCompany

export function Company() {
  const params = useParams()

  const { data } = useQuery<GetCompanyResponse>({
    queryKey: ['get-company', params.companyId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/companies/${params.companyId}`
      )
      const result: GetCompanyResponse = await response.json()
      return result
    },
  })

  if (data?.isConsortium) {
    // aqui: data é ConsortiumCompany
    data.consortiumMembers
  } else if (data) {
    // aqui: data é RegularCompany
  }

  return <div>Company Details {JSON.stringify(params)}</div>
}
