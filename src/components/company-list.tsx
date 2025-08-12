import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCompanies } from '@/http/use-companies'
import { dayjs } from '@/lib/dayjs'
import { Badge } from './ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export function CompanyList() {
  const { data, isLoading } = useCompanies()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas recentes</CardTitle>
        <CardDescription>
          Acesso rápido para as salas criadas recentemente
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <p className="text-muted-foreground text-sm">Carregando empresas...</p>
        )}

        {data?.map((company) => {
          return (
            <Link
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
              key={company.id}
              to={`/company/${company.id}`}
            >
              <div className="flex flex-1 flex-col gap-1">
                <h3 className="font-medium">{company.name}</h3>

                <div className="flex items-center gap-2">
                  <Badge className="text-xs" variant="secondary">
                    {dayjs(company.createdAt).toNow()}
                  </Badge>
                  <Badge className="text-xs" variant="secondary">
                    Líder: {company.leaderName}
                  </Badge>
                </div>
              </div>

              <span className="flex items-center gap-1 text-sm">
                Entrar
                <ArrowRight className="size-3" />
              </span>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}