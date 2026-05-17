
import { cookies } from "next/headers"
import { AuthProvider } from "@/context/auth_provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { LogOffButton } from "@/components/LogOffButton";
import { DemoViewProvider } from "@/context/demo_view_provider";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const cookieStore = cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"


    return (
        <div className="w-full h-full ">
            <AuthProvider>
                <DemoViewProvider>
                    <SidebarProvider defaultOpen={defaultOpen}>
                        <AppSidebar />
                        <div className="w-full min-h-screen flex flex-col items-center bg-background">
                            <div className="no-print w-full flex justify-between h-15 px-8 py-4 border-b border-primary/10 bg-white/70 backdrop-blur">
                                <SidebarTrigger />

                                <LogOffButton/>

                            </div>
                            {children}
                        </div>
                    </SidebarProvider>
                </DemoViewProvider>
            </AuthProvider>
        </div>
    );
}
