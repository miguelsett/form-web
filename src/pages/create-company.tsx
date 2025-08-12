import { CreateCompanyForm } from '@/components/create-company-form'
import { CompanyList } from '@/components/company-list'

export function CreateCompany() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <CreateCompanyForm />
          <CompanyList />
        </div>
      </div>
    </div>
  )
}