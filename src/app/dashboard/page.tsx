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

  // session.user가 없을 때 기본값 처리
  const userName = session.user?.name || '이름 정보 없음'
  const userEmail = session.user?.email || '이메일 정보 없음'

  return (
    <div className="container mx-auto my-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">마이 페이지</h1>

      {/* 사용자 정보 */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">내 정보</h2>
        <p className="mt-2">이름: {userName}</p>
        <p className="mt-2">이메일: {userEmail}</p>
      </div>

      {/* 내가 등록한 상품 */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">내가 등록한 상품</h2>
        <UserTopicList />
      </div>

      {/* 즐겨찾기 목록 */}
      <div className="mb-8">
        {userEmail !== '이메일 정보 없음' ? (
          <FavoritesList userEmail={userEmail} />
        ) : (
          <p>이메일 정보가 없어 즐겨찾기를 불러올 수 없습니다.</p>
        )}
      </div>
    </div>
  )
}
