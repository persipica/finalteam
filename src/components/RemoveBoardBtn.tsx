'use client'

import { useRouter } from 'next/navigation'
import { HiOutlineTrash } from 'react-icons/hi'

export default function RemoveBoardBtn({
  id,
  title,
}: {
  id: string
  title: string
}) {
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = confirm(`정말로 "${title}"을(를) 삭제하시겠습니까?`)

    if (confirmed) {
      try {
        const res = await fetch(`/api/board/${id}`, {
          method: 'DELETE',
        })

        if (!res.ok) {
          throw new Error('Failed to delete board')
        }

        router.push('/board')
        router.refresh()
      } catch (error) {
        console.error('Error:', error)
        alert('게시글 삭제에 실패했습니다.')
      }
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
    >
      <HiOutlineTrash className="mr-2" />
      삭제
    </button>
  )
}
