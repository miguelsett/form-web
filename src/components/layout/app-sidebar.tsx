import { Building2, Home } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

function useIsActive(path: string, exact = false) {
  const location = useLocation()
  if (exact) {
    return location.pathname === path
  }
  return location.pathname === path || location.pathname.startsWith(`${path}/`)
}

export function AppSidebar() {
  const isHome = useIsActive('/', true)
  const isCompanies = useIsActive('/companies')

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-3">
        <Link className="flex items-center gap-2" to="/">
          <span
            aria-label="Sondotecnica"
            className="inline-block h-14 w-56 bg-[url('/logo-sondotecnica-azul.svg')] bg-contain bg-left bg-no-repeat"
            role="img"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="flex items-center gap-4 text-lg"
                  isActive={isHome}
                >
                  <Link to="/">
                    <Home className="h-6 w-6" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="flex items-center gap-4 text-lg"
                  isActive={isCompanies}
                >
                  <Link to="/companies">
                    <Building2 className="h-6 w-6" />
                    <span>Companies</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
