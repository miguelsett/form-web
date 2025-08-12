import { useQuery } from '@tanstack/react-query'
import type { GetCompanyByIdResponse } from './types/get-company-by-id-response'

export function useGetCompanyById(id: string) {
  return useQuery({
    queryKey: ['get-company-by-id'],
    queryFn: async () => {
      const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'
      const response = await fetch(`${baseUrl}/companies/${id}`)
      const result: GetCompanyByIdResponse = await response.json()

      return result
    },
  })
}