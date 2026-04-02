import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ronaj Pradhan — Web Developer & AI Enthusiast',
  description: 'Personal portfolio of Ronaj Pradhan — building modern, fast, and visually clean applications.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
