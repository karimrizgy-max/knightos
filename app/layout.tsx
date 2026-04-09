import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: 'KnightOS - Master Chess with AI Coaching',
  description: 'Elevate your chess game with personalized AI coaching, tactical puzzles, and real-time multiplayer battles. Join thousands of players improving their skills.',
  keywords: 'chess, AI coaching, online chess, chess puzzles, chess tournaments, chess learning',
  authors: [{ name: 'KnightOS Team' }],
  openGraph: {
    title: 'KnightOS - Master Chess with AI Coaching',
    description: 'The ultimate chess platform with AI-powered coaching and competitive gameplay.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-chess bg-chess-darker text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}