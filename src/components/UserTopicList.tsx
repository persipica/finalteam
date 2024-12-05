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
            className="bg-white border border-gray-300 rounded-md shadow hover:shadow-lg p-4 transition"
          >
            <Link href={`/detailTopic/${topic._id}`}>
              {topic.image && (
                <Image
                  src={topic.image}
                  alt={topic.title}
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
                    {topic.title}
                  </h3>{' '}
                  {/* 제목 글씨 크기: 중간글씨 */}
                  <p
                    className="text-base text-black mt-1 overflow-hidden text-ellipsis whitespace-nowrap"
                    style={{ maxWidth: '120px' }} // 상품 설명의 최대 너비 제한
                  >
                    {topic.description}
                  </p>{' '}
                  {/* 설명 글씨 크기: 중간글씨, 설명이 길면 ...으로 생략 */}
                  <p className="text-sm text-gray-500 mt-2">
                    {topic.category}
                  </p>{' '}
                  {/* 카테고리 글씨 크기: 작은글씨 */}
                  <p className="mt-2 text-lg font-bold text-blue-600">
                    {topic.price.toLocaleString()} 원
                  </p>{' '}
                  {/* 가격 글씨 크기: 중간글씨 */}
                </div>

                {/* 오른쪽 영역 (조회수, 등록시간) */}
                <div className="flex flex-col items-end justify-between">
                  <p className="text-xs text-gray-500">
                    {getRelativeTime(topic.createdAt)}
                  </p>{' '}
                  {/* 등록시간 글씨 크기: 작은글씨 */}
                  <div className="text-xs text-gray-500 mt-2 flex items-center">
                    <FaEye className="mr-1" /> {/* 눈 아이콘 */}
                    {topic.views}
                  </div>{' '}
                  {/* 조회수 아이콘 및 숫자 */}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
