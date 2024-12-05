'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Topic {
  _id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  image?: string
  price: number
  category: string
}

export default function TopicLists() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [priceSortOrder, setPriceSortOrder] = useState<string>('asc')
  const [dateSortOrder, setDateSortOrder] = useState<string>('desc')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState<number>(1) // 현재 페이지 번호
  const itemsPerPage = 8 // 한 페이지에 표시할 상품 개수

  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await fetch('/api/topics')
        if (!res.ok) {
          throw new Error('Failed to fetch topics')
        }
        const data = await res.json()
        setTopics(data.topics)
      } catch (error) {
        console.error('Error loading topics: ', error)
        setError('Failed to load topics')
      } finally {
        setLoading(false)
      }
    }
    fetchTopics()
  }, [])

  const filteredTopics = topics
    .filter((topic) => {
      if (
        searchQuery &&
        !topic.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }
      if (selectedCategory && topic.category !== selectedCategory) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      if (priceSortOrder) {
        // 가격 정렬
        return priceSortOrder === 'asc' ? a.price - b.price : b.price - a.price
      }
      if (dateSortOrder) {
        // 날짜 정렬
        return dateSortOrder === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      return 0 // 기본 정렬 유지
    })

  // 페이지네이션에 따른 데이터 분리
  const totalItems = filteredTopics.length // 필터링된 총 상품 개수
  const totalPages = Math.ceil(totalItems / itemsPerPage) // 전체 페이지 수 계산
  const startIndex = (currentPage - 1) * itemsPerPage // 현재 페이지의 시작 인덱스
  const endIndex = startIndex + itemsPerPage // 현재 페이지의 끝 인덱스
  const paginatedTopics = filteredTopics.slice(startIndex, endIndex) // 현재 페이지에 해당하는 상품 목록

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Image
          src="/loading.gif" // 사용할 GIF 파일 경로
          alt="Loading animation"
          width={200}
          height={200}
        />
      </div>
    )
  if (error) return <p>Error: {error}</p>

  return (
    <div className="container mx-auto my-8">
      {/* 필터, 정렬 UI */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <label htmlFor="category" className="mr-2">
            카테고리:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">전체</option>
            <option value="가전제품">가전제품</option>
            <option value="문구(완구)">문구(완구)</option>
            <option value="장난감">장난감</option>
            <option value="생필품">생필품</option>
            <option value="가구">가구</option>
            <option value="기타">기타</option>
          </select>
        </div>

        <div>
          <label htmlFor="priceSort" className="mr-2">
            가격 순:
          </label>
          <select
            id="priceSort"
            value={priceSortOrder}
            onChange={(e) => {
              setPriceSortOrder(e.target.value)
              setDateSortOrder('') // 날짜 정렬 초기화
            }}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="asc">가격 낮은순</option>
            <option value="desc">가격 높은순</option>
          </select>
        </div>

        <div>
          <label htmlFor="dateSort" className="mr-2">
            날짜 순:
          </label>
          <select
            id="dateSort"
            value={dateSortOrder}
            onChange={(e) => {
              setDateSortOrder(e.target.value)
              setPriceSortOrder('') // 가격 정렬 초기화
            }}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="desc">최신순</option>
            <option value="asc">오래된순</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색어를 입력하세요..."
            className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
          />
        </div>
      </div>

      {/* 상품 목록 */}
      {paginatedTopics.length === 0 ? (
        <p className="text-gray-500 mt-4">등록된 상품이 없습니다...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {paginatedTopics.map((topic) => (
            <div
              key={topic._id}
              className="bg-white border border-gray-300 rounded-md shadow hover:shadow-lg p-4 transition"
            >
              <div className="relative h-48 w-full mb-4">
                <Image
                  src={topic.image || '/default-avatar.png'}
                  alt={topic.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {topic.title}
                <span className="text-sm text-gray-500 ml-2">
                  ({getRelativeTime(topic.createdAt)})
                </span>
              </h3>
              <p className="text-sm text-gray-600 mt-2 truncate">
                {topic.description}
              </p>
              <p className="text-sm text-gray-500 mt-2">{topic.category}</p>
              <h3 className="text-lg font-bold text-gray-800 truncate mt-4">
                {topic.price}원
              </h3>
              <Link href={`/detailTopic/${topic._id}`} passHref>
                <button className="text-blue-600 mt-4">자세히 보기</button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* 페이지네이션 UI */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-md ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
