'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import RemoveBtn from '@/components/RemoveBtn'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'
import Image from 'next/image'

interface Topic {
  _id: string
  title: string
  description: string
  image?: string
  price: number
  userEmail: string
  category: string
  views?: number
}

interface Comment {
  _id: string
  userEmail: string
  content: string
  createdAt: string
  isSeller: string
}

export default function TopicDetailPage() {
  const params = useParams()
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id
  const [topic, setTopic] = useState<Topic | null>(null)
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  const { data: session } = useSession()
  const userEmail = session?.user?.email

  useEffect(() => {
    if (!id) return

    const fetchTopic = async () => {
      try {
        const res = await fetch(`/api/topics/${id}`, {
          method: 'GET',
          headers: {
            'x-user-email': userEmail || '', // userEmail을 헤더에 포함
          },
        })
        if (!res.ok) throw new Error('Failed to fetch topic')
        const data = await res.json()
        setTopic(data)

        const commentRes = await fetch(`/api/comments?topicId=${id}`, {
          method: 'GET',
          headers: {
            'x-user-email': userEmail || '', // 동일하게 댓글 요청에도 헤더 추가
          },
        })
        if (!commentRes.ok) throw new Error('Failed to fetch comments')
        const { comments, sellerEmail } = await commentRes.json()
        setComments(
          comments.map((comment: Comment) => ({
            ...comment,
            isSeller: comment.userEmail === sellerEmail,
          }))
        )

        const favoritesRes = await fetch(
          `/api/favorites?userEmail=${userEmail}`
        )
        if (!favoritesRes.ok) throw new Error('Failed to fetch favorites')
        const favorites = await favoritesRes.json()
        const isProductFavorited = favorites.some(
          (favorite: { topicId: { _id: string } }) =>
            favorite.topicId._id === data._id
        )
        setIsFavorite(isProductFavorited)

        const visitedProducts = JSON.parse(
          localStorage.getItem('visitedProducts') || '[]'
        )

        if (
          !visitedProducts.some((product: Topic) => product._id === data._id)
        ) {
          if (visitedProducts.length >= 10) {
            visitedProducts.shift()
          }
          visitedProducts.push(data)
          localStorage.setItem(
            'visitedProducts',
            JSON.stringify(visitedProducts)
          )
        }
      } catch (error) {
        console.error('Error fetching topic:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopic()
  }, [id, userEmail])

  useEffect(() => {
    if (!id || !userEmail) return // id와 userEmail이 모두 필요하므로 한 번만 체크

    console.log('id:', id, 'userEmail:', userEmail) // 로그 추가

    // 조회수 증가
    const incrementViews = async (id: string, userEmail: string) => {
      try {
        const res = await fetch(`/api/topics/${id}/increment-views`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userEmail }), // body에 userEmail 포함
        })

        if (!res.ok) {
          throw new Error('Failed to increment views')
        }
        console.log('Views incremented successfully')
      } catch (error) {
        console.error('Error incrementing views:', error)
      }
    }

    incrementViews(id, userEmail)
  }, [id, userEmail]) // dependency 배열을 추가하여 id, userEmail이 바뀔 때마다 실행

  const handleImageClick = (image: string) => {
    setModalImage(image)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalImage(null)
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value)
  }

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return

    const newCommentData = {
      content: newComment,
      userEmail,
      topicId: topic?._id,
    }

    try {
      let res
      if (editingCommentId) {
        res = await fetch(`/api/comments/${editingCommentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCommentData),
        })
      } else {
        res = await fetch('/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCommentData),
        })
      }

      if (res.ok) {
        const data = await res.json()
        setComments((prev) => {
          if (editingCommentId) {
            return prev.map((comment) =>
              comment._id === editingCommentId ? data : comment
            )
          }
          return [data, ...prev]
        })
        setNewComment('')
        setEditingCommentId(null)
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
    }
  }

  const handleCommentEdit = (commentId: string) => {
    const commentToEdit = comments.find((c) => c._id === commentId)
    if (commentToEdit) {
      setNewComment(commentToEdit.content)
      setEditingCommentId(commentId)
    }
  }

  const handleCommentDelete = async (commentId: string) => {
    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setComments((prev) => prev.filter((c) => c._id !== commentId))
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  const handleAddToFavorites = async () => {
    if (!userEmail || !topic) return

    try {
      const method = isFavorite ? 'DELETE' : 'POST'
      const res = await fetch('/api/favorites', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topicId: topic._id, userEmail }),
      })

      if (res.ok) {
        setIsFavorite(!isFavorite)
        alert(
          isFavorite
            ? '찜 목록에서 삭제되었습니다!'
            : '찜 목록에 추가되었습니다!'
        )
      } else {
        throw new Error('Failed to update favorite')
      }
    } catch (error) {
      console.error('Error updating favorite:', error)
    }
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
  if (!topic)
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

  const isOwner = userEmail === topic.userEmail

  return (
    <div className="container mx-auto max-w-4xl p-6 bg-white shadow-md rounded-lg">
      <div className="relative">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">{topic.title}</h1>
        {topic.image && (
          <div className="flex justify-center mb-6">
            <Image
              src={topic.image}
              alt={topic.title}
              width={600}
              height={400}
              className="cursor-pointer rounded-lg shadow-lg"
              onClick={() => handleImageClick(topic.image!)}
            />
          </div>
        )}
        <p className="text-sm text-gray-500">조회수: {topic.views}</p>
        <div className="absolute top-0 right-0">
          {!isOwner && (
            <button
              onClick={handleAddToFavorites}
              className={`py-2 px-4 text-sm rounded-md ${
                isFavorite
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {isFavorite ? '찜 해제' : '찜하기'}
            </button>
          )}
        </div>
      </div>
      <p className="text-gray-600 mb-4">{topic.description}</p>
      <p className="text-lg font-semibold text-gray-900">
        가격: ₩{topic.price}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        카테고리: {topic.category || '없음'}
      </p>

      {isOwner && (
        <div className="flex justify-end mb-6">
          <Link
            href={`/editTopic/${topic._id}`}
            className="flex items-center py-2 px-4 text-sm font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <HiPencilAlt className="mr-2" />
            수정하기
          </Link>
          <RemoveBtn id={topic._id} title={topic.title} />
        </div>
      )}

      <div className="comments-section mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">댓글</h2>
        <div className="mb-4">
          <textarea
            className="w-full h-20 p-3 border border-gray-300 rounded-md"
            placeholder="댓글을 작성하세요..."
            value={newComment}
            onChange={handleCommentChange}
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            {editingCommentId ? '댓글 수정' : '댓글 작성'}
          </button>
        </div>
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment._id}
              className="p-4 border border-gray-200 rounded-md"
            >
              <div className="flex justify-between items-center">
                <span
                  className={`font-semibold ${
                    comment.isSeller ? 'text-blue-600' : 'text-gray-800'
                  }`}
                >
                  {comment.userEmail} {comment.isSeller ? '(판매자)' : ''}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700 mt-2">{comment.content}</p>
              {comment.userEmail === userEmail && (
                <div className="flex justify-end mt-2 space-x-2">
                  <button
                    onClick={() => handleCommentEdit(comment._id)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleCommentDelete(comment._id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    삭제
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <Image
              src={modalImage}
              alt="확대 이미지"
              width={800}
              height={600}
              className="rounded-lg shadow-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
