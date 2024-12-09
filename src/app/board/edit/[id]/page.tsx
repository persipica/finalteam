'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

// interface Board {
//   _id: string
//   title: string
//   content: string
//   image?: string
// }

export default function EditBoardPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login')
    },
  })
  const params = useParams()
  const router = useRouter()
  const id = params?.id

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [currentImage, setCurrentImage] = useState<string>('')

  useEffect(() => {
    if (!id) return

    const fetchBoard = async () => {
      const res = await fetch(`/api/board/${id}`)
      const data = await res.json()
      setTitle(data.title)
      setContent(data.content)
      setCurrentImage(data.image || '')
    }

    fetchBoard()
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session) {
      alert('로그인이 필요합니다.')
      router.push('/login')
      return
    }

    let imageUrl = currentImage

    if (image) {
      const formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', 'ay1ovxr7')
      formData.append('cloud_name', 'dkce7iuyq')

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dkce7iuyq/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      )
      const data = await res.json()
      imageUrl = data.secure_url
    }

    try {
      const res = await fetch(`/api/board/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          image: imageUrl,
        }),
      })

      if (!res.ok) throw new Error('Failed to update board')

      router.push(`/board/${id}`)
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
    }
  }
  if (!session) {
    return <div>Loading...</div>
  }
  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h1 className="text-2xl font-bold mb-6">게시글 수정</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded h-64"
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          수정하기
        </button>
      </form>
    </div>
  )
}
