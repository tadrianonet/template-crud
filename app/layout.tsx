import "./globals.css"
import { Inter } from "next/font/google"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Gerenciamento de Produtos",
  description: "Sistema de CRUD para gerenciamento de produtos",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className + " bg-gray-100"}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

