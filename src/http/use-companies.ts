import { useQuery } from '@tanstack/react-query'
import type { GetCompaniesResponse } from './types/get-companies-response'

export function useCompanies() {
  return useQuery({
    queryKey: ['get-companies'],
    queryFn: async () => {
      const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'
      const response = await fetch(`${baseUrl}/companies`)
      const result: GetCompaniesResponse = await response.json()

      return result
    },
  })
}