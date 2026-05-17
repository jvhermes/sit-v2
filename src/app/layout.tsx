
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIT",
  description: "Sicart Módulo SIT",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html >
      <body className={`${inter.className} flex `}>
        
          <Toaster />
          {children}
      </body>
    </html>
  );
}
