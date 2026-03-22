import type { Metadata } from "next"
import "./globals.css"
import NextAuthProvider from "@/providers/NextAuthProvider"

export const metadata: Metadata = {
  title: "Campground Booking",
  description: "Campground booking application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}