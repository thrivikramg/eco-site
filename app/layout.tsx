import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { CartProvider } from "@/components/cart-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })


export const metadata: Metadata = {
  title: "EcoGrow - Sustainable Products & Services",
  description: "Connect with nature, knowledge, and like-minded individuals.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
<html lang="en" suppressHydrationWarning>
  <head>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  </head>
  <body className={inter.className}>
    
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </body>
</html>

  )
}
