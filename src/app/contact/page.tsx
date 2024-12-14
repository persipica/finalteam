'use client'

import React from 'react'

export default function ContactPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        alert('문의가 성공적으로 접수되었습니다.')
      } else {
        alert('문의 접수에 실패했습니다.')
      }
    } catch (error) {
      console.error('문의 에러:', error)
      alert('오류가 발생했습니다.')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">문의하기</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="이름"
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="message"
          placeholder="문의 내용을 입력하세요"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          제출하기
        </button>
      </form>
    </div>
  )
}
