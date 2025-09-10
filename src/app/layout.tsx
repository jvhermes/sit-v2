
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/context/auth_provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIT",
  description: "Sicart Módulo SIT",
};


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.className} flex `}>
        <AuthProvider>
          <Toaster />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
