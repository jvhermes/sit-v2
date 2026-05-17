"use client"

import { Archive, CircleUser, Inbox, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { AuthContext } from "@/context/auth_provider"
import { DemoView, useDemoView } from "@/context/demo_view_provider"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navByView = {
  prefeitura: [
    {
      title: "Perfil",
      url: "/private/perfil",
      icon: CircleUser,
    },
    {
      title: "Processos",
      url: "/private/prefeitura",
      icon: Inbox,
    },
    {
      title: "Encerrados",
      url: "/private/prefeitura/encerrados",
      icon: Archive,
    },
    {
      title: "Configurações",
      url: "/private/admin",
      icon: Settings,
    },
  ],
  cartorio: [
    {
      title: "Perfil",
      url: "/private/perfil",
      icon: CircleUser,
    },
    {
      title: "Processos",
      url: "/private/cartorio",
      icon: Inbox,
    },
    {
      title: "Encerrados",
      url: "/private/cartorio/encerrados",
      icon: Archive,
    },
    {
      title: "Configurações",
      url: "/private/admin",
      icon: Settings,
    },
  ],
}

function viewFromPath(pathname: string): DemoView | null {
  if (pathname.startsWith("/private/cartorio")) return "cartorio"
  if (pathname.startsWith("/private/prefeitura")) return "prefeitura"

  return null
}

export function AppSidebar() {
  const { user } = useContext(AuthContext)
  const { view, setView } = useDemoView()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const routeView = viewFromPath(pathname)
    if (routeView && routeView !== view) {
      setView(routeView)
    }
  }, [pathname, setView, view])

  const changeView = (nextView: DemoView) => {
    setView(nextView)
    router.push(nextView === "prefeitura" ? "/private/prefeitura" : "/private/cartorio")
  }

  if (!user) return null

  const navItems = navByView[view]
  const label = view === "prefeitura" ? "SIT - Prefeitura" : "SIT - Cartórios"

  return (
    <Sidebar>
      <SidebarContent className="flex gap-5 items-center">
        <Avatar className="h-[8rem] w-[8rem] mt-10">
          <AvatarImage src={`/avatar${user.avatar}.png`} />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-center gap-1 px-4 text-center">
          <span className="text-sm">{user.nome}</span>
          <span className="text-xs uppercase text-gray-500">{user.perfil.toLowerCase()}</span>
        </div>

        <div className="grid w-11/12 grid-cols-2 rounded-md border border-sidebar-border bg-sidebar-accent p-1">
          <Button
            type="button"
            size="sm"
            variant={view === "prefeitura" ? "default" : "secondary"}
            className="rounded-sm"
            onClick={() => changeView("prefeitura")}
          >
            Prefeitura
          </Button>
          <Button
            type="button"
            size="sm"
            variant={view === "cartorio" ? "default" : "secondary"}
            className="rounded-sm"
            onClick={() => changeView("cartorio")}
          >
            Cartório
          </Button>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>{label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url} className="py-5">
                      <span>
                        <item.icon />
                      </span>
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
