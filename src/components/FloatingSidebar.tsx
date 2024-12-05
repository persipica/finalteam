'use client'

import Link from 'next/link'
import {
  FiHome,
  FiMessageSquare,
  FiUser,
  FiInfo,
  FiArrowUp,
  FiPlus,
  FiHelpCircle, // 추가된 아이콘
} from 'react-icons/fi'
import { useSession } from 'next-auth/react'

export default function FloatingSidebar() {
  const { status } = useSession() // 세션 정보 가져오기

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-lg p-3 transition-all duration-300 w-[50px] hover:w-[180px] group">
        <ul className="flex flex-col gap-6">
          <li>
            <Link
              href="/"
              className="flex items-center gap-4 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <div className="min-w-[24px]">
                <FiHome size={24} />
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
                홈으로
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/board"
              className="flex items-center gap-4 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <div className="min-w-[24px]">
                <FiMessageSquare size={24} />
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
                게시판
              </span>
            </Link>
          </li>
          {status === 'authenticated' && (
            <>
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-4 text-gray-700 hover:text-blue-500 transition-colors"
                >
                  <div className="min-w-[24px]">
                    <FiUser size={24} />
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
                    마이페이지
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/addTopic"
                  className="flex items-center gap-4 text-gray-700 hover:text-blue-500 transition-colors"
                >
                  <div className="min-w-[24px]">
                    <FiPlus size={24} />
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
                    상품등록
                  </span>
                </Link>
              </li>
            </>
          )}
          <li>
            <Link
              href="/team"
              className="flex items-center gap-4 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <div className="min-w-[24px]">
                <FiInfo size={24} />
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
                About Us
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="flex items-center gap-4 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <div className="min-w-[24px]">
                <FiHelpCircle size={24} />
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
                문의하기
              </span>
            </Link>
          </li>
          <li>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-4 text-gray-700 hover:text-blue-500 transition-colors w-full"
            >
              <div className="min-w-[24px]">
                <FiArrowUp size={24} />
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
                Top
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
