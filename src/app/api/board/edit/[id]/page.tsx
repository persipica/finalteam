'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'

interface Board {
  _id: string
  title: string
  content: string
  image?: string
}

export default function EditBoardPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id
  const [board, setBoard] = useState<Board | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchBoard = async () => {
      try {
        const res = await fetch(`/api/board/${id}`)
        if (!res.ok) throw new Error('Failed to fetch board')
        const data = await res.json()
        setBoard(data)
        setTitle(data.title)
        setContent(data.content)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBoard()
  }, [id])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImage(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let imageUrl = board?.image

      if (image) {
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'ml_default')

        const res = await fetch(
          'https://api.cloudinary.com/v1_1/your-cloud-name/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        )

        const data = await res.json()
        imageUrl = data.secure_url
      }

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

  if (loading) return <div>Loading...</div>

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          제목
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          내용
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          이미지
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {board?.image && (
          <div className="mt-2">
            <Image
              src={board.image}
              alt="Current image"
              width={200}
              height={200}
              className="rounded"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        수정하기
      </button>
    </form>
  )
}
