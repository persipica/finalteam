import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/Navbar'
import { NextAuthProvider } from '@/components/Providers'
import FloatingSidebar from '@/components/FloatingSidebar'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Image from 'next/image'

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
  title: '중부나라',
  description: '중고거래 플랫폼',
  icons: {
    icon: [
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    // Apple 기기를 위한 설정
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    // 파비콘도 추가
    shortcut: [{ url: '/favicon.ico' }],
  },
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
            <header className="bg-[#1A1A1A] text-white">
              <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                  {/* 로고와 브랜드명 */}
                  <Link href="/" className="flex items-center space-x-4">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={70}
                      height={70}
                      className="object-contain"
                    />
                    <div className="flex flex-col">
                      <span className="brand-title text-[#D4AF37] font-['Dancing_Script'] text-4xl">
                        중부나라
                      </span>
                      <span className="text-[#D4AF37] text-sm tracking-wider mt-1">
                        중고거래플랫폼
                      </span>
                    </div>
                  </Link>

                  {/* Navbar만 표시 */}
                  <Navbar />
                </div>
              </div>
              {/* 골드 구분선 추가 */}
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
            </header>

            <FloatingSidebar />
            <main className="mt-8">{children}</main>
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
