import type { PropsWithChildren } from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './app-sidebar'

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '20rem',
          '--sidebar-width-mobile': '22rem',
          '--sidebar-width-icon': '4rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
