import type { PropsWithChildren } from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './app-sidebar'

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
