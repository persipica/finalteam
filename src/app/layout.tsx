import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/Navbar'
import { NextAuthProvider } from '@/components/Providers'
import FloatingSidebar from '@/components/FloatingSidebar'
import Link from 'next/link'
import Footer from '@/components/Footer'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Final Team Market',
  description: '좋은 물건을 합리적인 가격에 만나보세요!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <div className="max-w-7xl mx-auto">
            <div className="one pt-8">
              <Link href="/">
                <h1>Final Team Market</h1>
              </Link>
            </div>
            <Navbar></Navbar>
            <FloatingSidebar />
            <div className="mt-8">{children}</div>
            <Footer></Footer>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
