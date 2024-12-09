'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import RemoveBoardBtn from '@/components/RemoveBoardBtn'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'
import Image from 'next/image'

interface Board {
  _id: string
  title: string
  content: string
  image?: string
  userEmail: string
  views: number
  createdAt: string
}

export default function BoardDetailPage() {
  const params = useParams()
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id
  const [board, setBoard] = useState<Board | null>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState<string | null>(null)

  const { data: session } = useSession()
  const userEmail = session?.user?.email

  useEffect(() => {
    if (!id) return

    const fetchBoard = async () => {
      try {
        const res = await fetch(`/api/board/${id}`, {
          method: 'GET',
          headers: {
            'x-user-email': userEmail || '',
          },
        })

        if (!res.ok) {
          throw new Error('Failed to fetch board')
        }

        const data = await res.json()
        setBoard(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBoard()
  }, [id, userEmail])

  const handleImageClick = () => {
    if (board?.image) {
      setModalImage(board.image)
      setIsModalOpen(true)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!board) return <div>게시글을 찾을 수 없습니다.</div>

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{board.title}</h1>
          {session?.user?.email === board.userEmail && (
            <div className="flex gap-2">
              <Link href={`/board/edit/${board._id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  <HiPencilAlt className="inline-block mr-2" />
                  수정
                </button>
              </Link>
              <RemoveBoardBtn id={board._id} title={board.title} />
            </div>
          )}
        </div>

        <div className="mb-4 text-sm text-gray-500">
          <p>작성자: {board.userEmail}</p>
          <p>작성일: {new Date(board.createdAt).toLocaleString()}</p>
          <p>조회수: {board.views}</p>
        </div>

        {board.image && (
          <div className="mb-6 cursor-pointer" onClick={handleImageClick}>
            <Image
              src={board.image}
              alt="게시글 이미지"
              width={800}
              height={400}
              className="rounded-lg"
            />
          </div>
        )}

        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap">{board.content}</p>
        </div>
      </div>

      {isModalOpen && modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="max-w-4xl max-h-[90vh] overflow-auto">
            <Image
              src={modalImage}
              alt="확대된 이미지"
              width={1200}
              height={800}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
