'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'

export default function RemoveBtn({
  id,
  title,
}: {
  id: string
  title: string
}) {
  const router = useRouter()

  // id가 빈 문자열인 경우 버튼을 렌더링하지 않음
  if (!id) return null

  async function removeTopic() {
    const confirmed = confirm(`정말로 "${title}"을(를) 삭제하시겠습니까?`)
    if (confirmed) {
      // 수정된 API 엔드포인트로 DELETE 요청
      const res = await fetch(`/api/topics/${id}`, { method: 'DELETE' })

      if (res.ok) {
        alert('상품이 삭제되었습니다.')
        router.push('/') // 메인 페이지로 리다이렉트
      } else {
        alert('상품 삭제에 실패했습니다.')
      }
    }
  }

  return (
    <button className="text-red-400" onClick={removeTopic}>
      <HiOutlineTrash size={24} />
    </button>
  )
}
