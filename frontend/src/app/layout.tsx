import type { Metadata } from 'next'
import { Inter } from "next/font/google"
import './globals.css'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// const inter = Inter({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Terminal Tutor',
  description: 'Learn how to use the terminal interactively',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <header className="bg-primary text-primary-foreground shadow-md">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">Terminal Tutor</Link>
            <ul className="flex space-x-4">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/lessons" className="hover:underline">Lessons</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
            </ul>
          </nav>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="bg-secondary text-secondary-foreground mt-auto">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <p>&copy; 2023 Terminal Tutor. All rights reserved.</p>
            <Button variant="ghost" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </footer>
      </body>
    </html>
  )
}

