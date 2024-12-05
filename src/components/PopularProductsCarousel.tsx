'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Topic {
  _id: string
  title: string
  price: number
  image?: string
  views?: number // 조회수 필드가 있을 수 있음
}

interface Product {
  _id: string
  title: string
  price: number
  image?: string
  views: number // 조회수는 반드시 존재하는 값
}

export default function PopularProductsCarousel({
  products,
}: {
  products: Topic[] // Topic[] 타입을 받음
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Topic을 Product로 변환
  const convertTopicToProduct = (topic: Topic): Product => {
    return {
      _id: topic._id,
      title: topic.title,
      price: topic.price,
      image: topic.image,
      views: topic.views ?? 0, // views가 없으면 0으로 처리
    }
  }

  // 조회수를 기준으로 상위 5개의 인기 상품을 필터링
  const popularProducts = [...products]
    .map(convertTopicToProduct) // Topic을 Product로 변환
    .sort((a, b) => b.views - a.views) // 조회수 내림차순 정렬
    .slice(0, 5) // 상위 5개 상품만 선택

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === popularProducts.length - 1 ? 0 : prevIndex + 1
      )
    }, 6000)

    return () => clearInterval(timer) // 컴포넌트 언마운트 시 타이머 정리
  }, [popularProducts.length])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? popularProducts.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === popularProducts.length - 1 ? 0 : prevIndex + 1
    )
  }

  if (!popularProducts.length) return null

  return (
    <div className="relative w-full overflow-hidden">
      {/* 슬라이드 컨테이너 */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {popularProducts.map((product) => (
          <div key={product._id} className="w-full flex-shrink-0">
            <Link href={`/detailTopic/${product._id}`}>
              <div className="flex flex-col items-center p-4">
                <div className="relative w-64 h-64">
                  <Image
                    src={product.image || '/default-avatar.png'}
                    alt={product.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mt-4">{product.title}</h3>
                <p className="mt-2 text-lg font-bold text-blue-600">
                  {product.price.toLocaleString()} 원
                </p>
                <p className="text-sm text-gray-500">조회수: {product.views}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* 왼쪽 화살표 */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white p-4 rounded-full opacity-40 hover:opacity-75 transition-opacity duration-200"
        onClick={handlePrev}
      >
        &#8592;
      </button>

      {/* 오른쪽 화살표 */}
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-4 rounded-full opacity-40 hover:opacity-75 transition-opacity duration-200"
        onClick={handleNext}
      >
        &#8594;
      </button>
    </div>
  )
}
