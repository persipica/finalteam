import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaEye } from 'react-icons/fa'

interface Favorite {
  _id: string
  topicId: {
    _id: string
    title: string
    description: string
    price: number
    category: string
    createdAt: string
    image?: string
    views?: number
  }
}

export default function FavoritesList({ userEmail }: { userEmail: string }) {
  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    if (!userEmail) return

    const fetchFavorites = async () => {
      try {
        const res = await fetch(`/api/favorites?userEmail=${userEmail}`)
        if (!res.ok) throw new Error('Failed to fetch favorites')
        const data = await res.json()
        setFavorites(data)
      } catch (error) {
        console.error('Error fetching favorites:', error)
      }
    }

    fetchFavorites()
  }, [userEmail])

  function getRelativeTime(createdAt: string) {
    const now = new Date()
    const createdTime = new Date(createdAt)
    const diffInSeconds = Math.floor(
      (now.getTime() - createdTime.getTime()) / 1000
    )

    if (diffInSeconds < 60) {
      return `${diffInSeconds}초 전`
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`
    }
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours}시간 전`
    }
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}일 전`
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">찜한 상품</h2>
      {/* 찜한 상품이 없으면 메시지 표시 */}
      {favorites.length === 0 ? (
        <p className="text-gray-500 mt-4">찜한 상품이 없습니다...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {favorites.map((favorite) => (
            <div
              key={favorite._id}
              className="bg-white border border-gray-300 rounded-md shadow hover:shadow-lg p-4 transition"
            >
              <Link href={`/detailTopic/${favorite.topicId._id}`}>
                {favorite.topicId.image && (
                  <Image
                    src={favorite.topicId.image}
                    alt={favorite.topicId.title}
                    width={500}
                    height={300}
                    className="object-cover w-full h-48"
                  />
                )}
                <div className="p-4 flex justify-between">
                  {/* 왼쪽 영역 (제목, 설명, 카테고리, 가격) */}
                  <div className="flex-1 pr-4">
                    {' '}
                    {/* 오른쪽 여백 추가 */}
                    <h3 className="text-lg font-semibold text-black">
                      {favorite.topicId.title}
                    </h3>{' '}
                    {/* 제목 글씨 크기: 중간글씨 */}
                    <p
                      className="text-base text-black mt-1 overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{ maxWidth: '120px' }} // 상품 설명의 최대 너비 제한
                    >
                      {favorite.topicId.description}
                    </p>{' '}
                    {/* 설명 글씨 크기: 중간글씨, 설명이 길면 ...으로 생략 */}
                    <p className="text-sm text-gray-500 mt-2">
                      {favorite.topicId.category}
                    </p>{' '}
                    {/* 카테고리 글씨 크기: 작은글씨 */}
                    <p className="mt-2 text-lg font-bold text-blue-600">
                      {favorite.topicId.price.toLocaleString()} 원
                    </p>{' '}
                    {/* 가격 글씨 크기: 중간글씨 */}
                  </div>

                  {/* 오른쪽 영역 (조회수, 등록시간) */}
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-xs text-gray-500">
                      {getRelativeTime(favorite.topicId.createdAt)}
                    </p>{' '}
                    {/* 등록시간 글씨 크기: 작은글씨 */}
                    <div className="text-xs text-gray-500 mt-2 flex items-center">
                      <FaEye className="mr-1" /> {/* 눈 아이콘 */}
                      {favorite.topicId.views}
                    </div>{' '}
                    {/* 조회수 아이콘 및 숫자 */}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
