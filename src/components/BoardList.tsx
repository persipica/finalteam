'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaEye } from 'react-icons/fa'

interface BoardPost {
  _id: string
  title: string
  content: string
  userEmail: string
  createdAt: string
  views: number
}

export default function BoardList() {
  const [posts, setPosts] = useState<BoardPost[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/board')
      const data = await res.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                제목
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                작성자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                작성일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                조회수
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <Link
                    href={`/board/${post._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {post.userEmail}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FaEye className="mr-1" />
                    {post.views}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
