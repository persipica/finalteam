'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  const { status, data: session } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center bg-[#1A1A1A] px-8 py-4 shadow gap-4">
      <div className="flex gap-2 items-center">
        <Image
          src={session?.user?.image ?? '/default-avatar.png'}
          width={40}
          height={40}
          alt={session?.user?.name ?? 'user'}
          className="rounded-full"
        />
        <span className="text-[#D4AF37] font-bold">{session?.user?.name}</span>
      </div>

      <div className="flex gap-4 items-center">
        {status === 'authenticated' ? (
          <>
            <button
              onClick={handleSignOut}
              className="bg-[#D4AF37] hover:bg-[#B8860B] text-white px-4 py-2 rounded text-sm font-bold transition-all"
            >
              Sign Out
            </button>
            <Link
              href="/addTopic"
              className="bg-[#D4AF37] hover:bg-[#B8860B] text-white px-4 py-2 rounded text-sm font-bold transition-all"
            >
              상품 등록
            </Link>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-[#D4AF37] hover:bg-[#B8860B] text-white px-4 py-2 rounded text-sm font-bold transition-all"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
