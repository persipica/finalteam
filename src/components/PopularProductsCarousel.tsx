'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Topic {
  _id: string
  title: string
  price: number
  image?: string
  views?: number
}

interface Product {
  _id: string
  title: string
  price: number
  image?: string
  views: number
}

export default function PopularProductsCarousel({
  products,
}: {
  products: Topic[]
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const convertTopicToProduct = (topic: Topic): Product => {
    return {
      _id: topic._id,
      title: topic.title,
      price: topic.price,
      image: topic.image,
      views: topic.views ?? 0,
    }
  }

  const popularProducts = [...products]
    .map(convertTopicToProduct)
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === popularProducts.length - 1 ? 0 : prevIndex + 1
      )
    }, 6000)

    return () => clearInterval(timer)
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

      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white p-4 rounded-full opacity-40 hover:opacity-75 transition-opacity duration-200"
        onClick={handlePrev}
      >
        &#8592;
      </button>

      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-4 rounded-full opacity-40 hover:opacity-75 transition-opacity duration-200"
        onClick={handleNext}
      >
        &#8594;
      </button>
    </div>
  )
}
