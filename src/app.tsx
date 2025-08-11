import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/app-layout'
import { CompaniesPage } from './pages/companies-page'
import { Company } from './pages/company'
import { CreateCompany } from './pages/create-company'
import { Home } from './pages/home'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<CompaniesPage />} path="/companies" />
            <Route element={<Company />} path="/company/:companyId" />
            <Route element={<CreateCompany />} path="/companies/create" />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
