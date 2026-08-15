import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DevX-Ray AI | Analyze. Diagnose. Upgrade.',
  description: 'Intelligent developer skill analysis platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
