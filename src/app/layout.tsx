import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sellable - Turn Ideas into Digital Products in 2 Minutes',
  description: 'Create sellable digital products using AI in under 2 minutes. Generate PDFs, audio content, pricing strategies, and marketing materials instantly.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

