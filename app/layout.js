import "./globals.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { LanguageProvider } from "../lib/i18n"

export const metadata = {
  title: "SOFE COFFEE — Brewed Without Bounds",
  description:
    "Brewed Without Bounds, Anytime, Anywhere with SOFE COFFEE. Premium coffee beans, drip bags, and espresso blends from Hong Kong.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Header />
          <main className="page-content">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}