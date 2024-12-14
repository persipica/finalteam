'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react' // 로그인 상태 확인
import { FaEye } from 'react-icons/fa'
import Link from 'next/link'

import Image from 'next/image'

interface Topic {
  _id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  image?: string // 상품 이미지를 추가할 수 있도록 필드 확장
  price: number
  userEmail: string // 상품 등록한 사용자의 이메일 추가
  category: string // 카테고리 필드 추가
  views?: number
  status: string
}

export default function TopicLists() {
  const { data: session } = useSession() // 로그인한 사용자 정보 가져오기
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await fetch('/api/topics')
        if (!res.ok) {
          throw new Error('Failed to fetch topics')
        }
        const data = await res.json()

        // 로그인한 사용자의 이메일만 필터링
        if (session) {
          const userTopics = data.topics.filter(
            (topic: Topic) => topic.userEmail === session.user?.email
          )
          setTopics(userTopics)
        }
      } catch (error) {
        console.error('Error loading topics: ', error)
        setError('Failed to load topics')
      } finally {
        setLoading(false)
      }
    }
    fetchTopics()
  }, [session]) // session이 변경될 때마다 실행

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
  if (topics.length === 0)
    return <p className="text-gray-500 mt-4">등록한 상품이 없습니다...</p>

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
                {/* 상품 정보 */}
                <div className="flex-1 pr-4">
                  <h3 className="text-lg font-semibold text-black">
                    {topic.title}
                  </h3>
                  <p className="text-base text-black mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {topic.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">{topic.category}</p>
                  <p className="mt-2 text-lg font-bold text-blue-600">
                    {topic.price.toLocaleString()} 원
                  </p>
                </div>
                {/* 등록 시간 및 조회수 */}
                <div className="flex flex-col items-end justify-between">
                  <p className="text-xs text-gray-500">
                    {getRelativeTime(topic.createdAt)}
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
