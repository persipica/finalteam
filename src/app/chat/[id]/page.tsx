'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface Comment {
  _id: string
  userEmail: string
  content: string
  createdAt: string
}

export default function ChatPage() {
  const params = useParams()
  const { topicId } = params
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)

  const { data: session } = useSession()
  const userEmail = session?.user?.email

  useEffect(() => {
    if (!topicId) {
      console.error('topicId is missing')
      setLoading(false)
      return
    }

    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments?topicId=${topicId}`)
        if (!res.ok) throw new Error('Failed to fetch comments')
        const { comments } = await res.json()
        setComments(comments)
      } catch (error) {
        console.error('Error fetching comments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [topicId])

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value)
  }

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return

    const newCommentData = {
      content: newComment,
      userEmail,
      topicId,
    }

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCommentData),
      })

      if (res.ok) {
        const data = await res.json()
        setComments((prev) => [data, ...prev])
        setNewComment('')
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="container mx-auto my-8 max-w-4xl">
      <h2 className="text-3xl font-bold mb-4">대화</h2>

      <div className="space-y-4 max-h-64 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment._id} className="border-b pb-2">
            <p className="text-gray-800">{comment.content}</p>
            <p className="text-sm text-gray-500">{comment.userEmail}</p>
          </div>
        ))}
      </div>

      <textarea
        value={newComment}
        onChange={handleCommentChange}
        placeholder="메시지를 작성하세요"
        rows={3}
        className="w-full border p-2 rounded-md mt-4"
      />
      <button
        onClick={handleCommentSubmit}
        className="bg-blue-600 text-white py-2 px-4 rounded-md mt-2"
      >
        메시지 보내기
      </button>
    </div>
  )
}
