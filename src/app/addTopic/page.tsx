'use client'

import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function AddTopicPage() {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    redirect('/login')
  }

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<number | string>('')
  const [image, setImage] = useState<File | null>(null)
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImage(file)
  }

  /**
   *
   * @param image
   * @returns
   */
  const uploadImageToCloudinary = async (image: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'ay1ovxr7')
    formData.append('cloud_name', 'dkce7iuyq')

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dkce7iuyq/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      )
      const data = await res.json()
      return data.secure_url
    } catch (error) {
      console.error('Cloudinary 이미지 업로드 실패:', error)
      throw new Error('이미지 업로드에 실패했습니다.')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title || !description || !price || !category) {
      alert('상품명, 가격, 설명, 카테고리가 모두 필요합니다.')
      return
    }

    setLoading(true)
    let imageUrl = ''

    try {
      if (image) {
        imageUrl = await uploadImageToCloudinary(image)
      }

      const payload = {
        title,
        description,
        price,
        category,
        image: imageUrl,
        userEmail: session?.user?.email || '',
      }

      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        alert('상품이 성공적으로 등록되었습니다.')
        router.push('/')
      } else {
        throw new Error('상품 등록에 실패했습니다.')
      }
    } catch (error) {
      console.error('상품 등록 에러:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto my-8 max-w-4xl px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">상품 등록</h2>
      <form
        className="border border-gray-300 rounded-lg bg-white shadow-lg p-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block mb-2 font-bold text-gray-700 text-sm"
          >
            상품 이미지
          </label>
          <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 font-bold text-gray-700 text-sm"
          >
            상품명
          </label>
          <input
            id="title"
            type="text"
            placeholder="상품명을 입력하세요"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 font-bold text-gray-700 text-sm"
          >
            상품 설명
          </label>
          <textarea
            id="description"
            placeholder="상품에 대한 설명을 입력하세요"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="price"
            className="block mb-2 font-bold text-gray-700 text-sm"
          >
            상품 가격
          </label>
          <input
            id="price"
            type="number"
            placeholder="상품 가격을 입력하세요"
            value={price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="block mb-2 font-bold text-gray-700 text-sm"
          >
            카테고리
          </label>
          <select
            id="category"
            value={category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCategory(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">카테고리를 선택하세요</option>
            <option value="가전제품">가전제품</option>
            <option value="문구(완구)">문구(완구)</option>
            <option value="장난감">장난감</option>
            <option value="생필품">생필품</option>
            <option value="가구">가구</option>
            <option value="기타">기타</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          {loading ? '등록 중...' : '상품 등록'}
        </button>
      </form>
    </div>
  )
}
