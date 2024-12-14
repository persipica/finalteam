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
    status: string
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
      {favorites.length === 0 ? (
        <p className="text-gray-500 mt-4">찜한 상품이 없습니다...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {favorites.map((favorite) => (
            <div
              key={favorite._id}
              className="bg-white border border-gray-300 rounded-md shadow hover:shadow-lg p-4 transition relative"
            >
              <Link href={`/detailTopic/${favorite.topicId._id}`}>
                {favorite.topicId.image && (
                  <Image
                    src={favorite.topicId.image}
                    alt={favorite.topicId.title}
                    width={500}
                    height={300}
                    className={`object-cover w-full h-48 ${
                      favorite.topicId.status === '판매완료' ? 'blur-sm' : ''
                    }`}
                  />
                )}
                {favorite.topicId.status === '판매완료' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-semibold">
                    판매 완료
                  </div>
                )}
                <div className="p-4 flex justify-between">
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg font-semibold text-black">
                      {favorite.topicId.title}
                    </h3>
                    <p
                      className="text-base text-black mt-1 overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{ maxWidth: '120px' }}
                    >
                      {favorite.topicId.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {favorite.topicId.category}
                    </p>
                    <p className="mt-2 text-lg font-bold text-blue-600">
                      {favorite.topicId.price.toLocaleString()} 원
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-xs text-gray-500">
                      {getRelativeTime(favorite.topicId.createdAt)}
                    </p>
                    <div className="text-xs text-gray-500 mt-2 flex items-center">
                      <FaEye className="mr-1" />
                      {favorite.topicId.views}
                    </div>
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
