'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { FaEye } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

interface Topic {
  _id: string
  title: string
  description: string
  price: number
  image?: string
  userEmail: string
  category: string
  views?: number
  createdAt?: Date
  updatedAt?: Date
  status: string
}

export default function SoldTopicLists() {
  const { data: session } = useSession()
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSoldTopics() {
      try {
        const res = await fetch('/api/topics')
        if (!res.ok) {
          throw new Error('Failed to fetch topics')
        }
        const data = await res.json()

        if (session) {
          const soldTopics = data.topics.filter(
            (topic: Topic) =>
              topic.userEmail === session.user?.email &&
              topic.status === '판매완료'
          )
          setTopics(soldTopics)
        }
      } catch (error) {
        console.error('Error loading topics: ', error)
        setError('Failed to load topics')
      } finally {
        setLoading(false)
      }
    }
    fetchSoldTopics()
  }, [session])

  function getRelativeTime(createdAt: string | undefined) {
    if (!createdAt) return ''
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
          src="/loading.gif"
          alt="Loading animation"
          width={200}
          height={200}
        />
      </div>
    )
  if (error) return <p>Error: {error}</p>
  if (topics.length === 0)
    return <p className="text-gray-500 mt-4">판매 완료된 상품이 없습니다...</p>

  return (
    <div className="container mx-auto my-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
        {topics.map((topic: Topic) => (
          <div
            key={topic._id}
            className="bg-white border border-gray-300 rounded-md shadow hover:shadow-lg p-4 transition relative"
          >
            <Link href={`/detailTopic/${topic._id}`}>
              {topic.image && (
                <Image
                  src={topic.image}
                  alt={topic.title}
                  width={500}
                  height={300}
                  className={`object-cover w-full h-48 ${
                    topic.status === '판매완료' ? 'blur-sm' : ''
                  }`}
                />
              )}
              {topic.status === '판매완료' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-semibold">
                  판매 완료
                </div>
              )}
              <div className="p-4 flex justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="text-lg font-semibold text-black">
                    {topic.title}
                  </h3>
                  <p
                    className="text-base text-black mt-1 overflow-hidden text-ellipsis whitespace-nowrap"
                    style={{ maxWidth: '120px' }}
                  >
                    {topic.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">{topic.category}</p>
                  <p className="mt-2 text-lg font-bold text-blue-600">
                    {topic.price.toLocaleString()} 원
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <p className="text-xs text-gray-500">
                    {getRelativeTime(topic.createdAt?.toString())}
                  </p>
                  <div className="text-xs text-gray-500 mt-2 flex items-center">
                    <FaEye className="mr-1" />
                    {topic.views}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
