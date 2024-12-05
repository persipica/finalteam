'use client'

import { useSession } from 'next-auth/react'

import UserTopicList from '@/components/UserTopicList'
import FavoritesList from '@/components/FavoritesList'

export default function DashboardPage() {
  const { data: session, status } = useSession()

  // 세션 로딩 중일 때 처리
  if (status === 'loading') return <div>Loading...</div>

  // 세션이 없을 때 처리
  if (!session) return <div>세션 정보가 없습니다. 로그인 해주세요.</div>

  // session.user?.email이 undefined인 경우에 기본값 처리
  const userEmail = session.user?.email ?? ''

  return (
    <div className="container mx-auto my-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">마이 페이지</h1>

      {/* 사용자 정보 */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">내 정보</h2>
        <p className="mt-2">이름: {session.user?.name}</p>
        <p className="mt-2">
          이메일: {session.user?.email || '이메일 정보 없음'}
        </p>
      </div>

      {/* 내가 등록한 상품 */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">내가 등록한 상품</h2>
        <UserTopicList />
      </div>

      {/* 즐겨찾기 목록 */}
      <div className="mb-8">
        {userEmail ? (
          <FavoritesList userEmail={userEmail} />
        ) : (
          <p>이메일 정보가 없어 즐겨찾기를 불러올 수 없습니다.</p>
        )}
      </div>
    </div>
  )
}
