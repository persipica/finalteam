'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PopularProductsCarousel from './PopularProductsCarousel' // 컴포넌트 임포트

interface Topic {
  _id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  image?: string
  price: number
  category: string
  views?: number
}

interface Product {
  id: string
  title: string
  price: number
  image?: string
  views?: number
  // 필요한 다른 속성들
}

export default function TopicLists() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [priceSortOrder, setPriceSortOrder] = useState<string>('asc')
  const [dateSortOrder, setDateSortOrder] = useState<string>('desc')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // 인기 상품 슬라이드를 위한 상태
  const [popularTopics, setPopularTopics] = useState<Topic[]>([])

  // 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState<number>(1) // 현재 페이지 번호
  const itemsPerPage = 8 // 한 페이지에 표시할 상품 개수

  // Topic을 Product로 변환하는 함수
  const convertTopicToProduct = (topic: Topic): Product => {
    return {
      id: topic._id,
      title: topic.title,
      price: topic.price,
      image: topic.image,
      views: topic.views,
    }
  }

  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await fetch('/api/topics')
        if (!res.ok) {
          throw new Error('Failed to fetch topics')
        }
        const data = await res.json()
        setTopics(data.topics)

        // 인기 상품 조회수 기준으로 정렬 후 상위 5개 선택
        const sortedTopics = data.topics
          .sort((a: Topic, b: Topic) => (b.views || 0) - (a.views || 0))
          .slice(0, 5)
          .map((topic: Topic) => convertTopicToProduct(topic)) // 변환 함수 적용

        setPopularTopics(sortedTopics)
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
      {/* 인기 상품 슬라이드 */}
      {popularTopics.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">인기 상품</h2>
          <PopularProductsCarousel products={popularTopics} />{' '}
          {/* 인기상품 슬라이드 컴포넌트 추가 */}
        </div>
      )}
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
              className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden"
            >
              <Link href={`/topics/${topic._id}`}>
                {topic.image && (
                  <Image
                    src={topic.image}
                    alt={topic.title}
                    width={500}
                    height={300}
                    className="object-cover w-full h-48"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {getRelativeTime(topic.createdAt)}
                  </p>
                  <p className="mt-2 text-xl font-bold">
                    {topic.price.toLocaleString()} 원
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex space-x-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-blue-500 border border-blue-500'
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
