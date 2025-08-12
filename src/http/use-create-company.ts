import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateCompanyRequest } from './types/create-company-request'
import type { CreateCompanyResponse } from './types/create-company-response'

export function useCreateCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateCompanyRequest) => {
      const response = await fetch('http://localhost:3333/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result: CreateCompanyResponse = await response.json()

      return result
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-companies'] })
    },
  })
}