'use client'

import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function WriteBoardPage() {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    redirect('/login')
  }

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.')
      return
    }

    let imageUrl = ''
    if (image) {
      // 기존 이미지 업로드 로직 사용
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
      const res = await fetch('/api/board', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          image: imageUrl,
          userEmail: session.user?.email,
        }),
      })

      if (res.ok) {
        router.push('/board')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('글 작성에 실패했습니다.')
    }
  }

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h1 className="text-2xl font-bold mb-6">글쓰기</h1>
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
          작성하기
        </button>
      </form>
    </div>
  )
}
