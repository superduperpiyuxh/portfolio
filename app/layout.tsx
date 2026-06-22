import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import ThemeProvider from "@/components/ThemeProvider"
import ErrorBoundary from "@/components/ErrorBoundary"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Piyuxhh | Portfolio",
  description: "Full-stack developer passionate about 3D web, animations, and crafting beautiful interfaces.",
  openGraph: {
    title: "Piyuxhh | Portfolio",
    description: "Full-stack developer passionate about 3D web, animations, and crafting beautiful interfaces.",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Piyuxhh",
  url: "https://piyuxhh.dev",
  description: "Full-stack developer passionate about 3D web, animations, and crafting beautiful interfaces.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>
          <ErrorBoundary>
            <div id="main-content">{children}</div>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
