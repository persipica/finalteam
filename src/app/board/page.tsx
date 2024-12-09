'use client'

import { useSession } from 'next-auth/react'
// import { redirect } from 'next/navigation'
import Link from 'next/link'
import BoardList from '@/components/BoardList'

export default function BoardPage() {
  const { data: session } = useSession()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">자유게시판</h1>
        {session && (
          <Link
            href="/board/write"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            글쓰기
          </Link>
        )}
      </div>
      <BoardList />
    </div>
  )
}
