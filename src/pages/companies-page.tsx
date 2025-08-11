import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

type Company =
  | {
      id: string
      name: string
      isConsortium: true
      createdAt: string
      updatedAt: string
      leaderName: string
    }
  | {
      id: string
      name: string
      isConsortium: false
      createdAt: string
      updatedAt: string
      leaderName?: never
    }

type GetCompaniesResponse = Company[]

export function CompaniesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-companies'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/companies')
      const result: GetCompaniesResponse = await response.json()
      return result
    },
  })
  return (
    <div>
      <Link className="underline" to="/companies/create">
        Create Company
      </Link>

      <div>Companies</div>

      {isLoading && <div>Loading...</div>}
      <div className="flex flex-col gap-1">
        {data?.map((company) => {
          return (
            <Link key={company.id} to={`/company/${company.id}`}>
              {company.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
