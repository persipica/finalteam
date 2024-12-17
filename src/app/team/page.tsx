'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'

type TeamMember = {
  name: string
  role: string
  bio: string
  image: string
  email: string
  social: {
    github: string
    linkedin: string
    instagram: string
  }
}

const teamMembers: TeamMember[] = [
  {
    name: '강희수',
    role: '프로젝트 전반 제작',
    bio: '프로젝트 전반 제작',
    image: '/team1.png',
    email: 'studyharder11@gmail.com',
    social: {
      github: 'https://github.com/persipica',
      linkedin: 'https://finalterm-chi.vercel.app/',
      instagram: 'https://www.instagram.com/honggildong',
    },
  },
  {
    name: '임건희',
    role: '사이드바 제작, 게시판 제작',
    bio: '사이드바, ui 디자인 참여, 게시판 기능 제작',
    image: '/team2.png',
    email: 'kim@example.com',
    social: {
      github: 'https://github.com/limgunny',
      linkedin: 'https://portfolio-mu-gold-54.vercel.app/',
      instagram: 'https://www.instagram.com/kimcheolsu',
    },
  },
  {
    name: '박대희',
    role: '팀원 소개 페이지 제작',
    bio: '팀원 소개 페이지 제작',
    image: '/team3.png',
    email: 'park@example.com',
    social: {
      github: 'https://github.com/parkdaihee',
      linkedin: 'https://far-nu.vercel.app/',
      instagram: 'https://www.instagram.com/parkyeonghee',
    },
  },
  {
    name: '최경규',
    role: '문의 페이지 제작, 로고와 아이콘 제작',
    bio: '문의 페이지제작, 프로젝트 아이디어 제시, 로고 및 아이콘등 제작',
    image: '/team4.png',
    email: 'jeong@example.com',
    social: {
      github: 'https://github.com/rudrb',
      linkedin: 'https://lastproject-puce.vercel.app/',
      instagram: 'https://www.instagram.com/jeongjihoon',
    },
  },
  {
    name: '오건우',
    role: '프로젝트 디자인',
    bio: '프로젝트 디자인 참여',
    image: '/team5.png',
    email: 'lee@example.com',
    social: {
      github: 'https://github.com/BigWales98',
      linkedin: 'https://next-js-portpolio2.vercel.app/',
      instagram: 'https://www.instagram.com/leesumin',
    },
  },
  {
    name: '유선빈',
    role: '??',
    bio: '??',
    image: '/team6.png',
    email: 'choi@example.com',
    social: {
      github: 'https://github.com/Rickyphantom',
      linkedin: 'https://2-2-portfolio.vercel.app/',
      instagram: 'https://www.instagram.com/choidonghyun',
    },
  },
]

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('')

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRole ? member.role === selectedRole : true)
  )

  return (
    <div className="bg-white text-gray-900 min-h-screen py-16 px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-blue-600">팀원 소개</h1>
        <p className="text-gray-700 mt-4 opacity-80">
          프로젝트를 함께한 팀원들
        </p>

        <div className="mt-6">
          <input
            type="text"
            placeholder="팀원 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-6 py-3 rounded-xl shadow-md bg-gray-100 text-gray-900 w-1/2 sm:w-1/3 placeholder-gray-500"
          />
        </div>

        <div className="mt-6">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-6 py-3 rounded-xl shadow-md bg-gray-100 text-gray-900"
          >
            <option value="">전체 역할</option>
            <option value="프로젝트 전반 제작">프로젝트 전반 제작</option>
            <option value="사이드바 제작, 게시판 제작">
              사이드바 제작, 게시판 제작
            </option>
            <option value="팀원 소개 페이지 제작">팀원 소개 페이지 제작</option>
            <option value="문의 페이지 제작, 로고와 아이콘 제작">
              문의 페이지 제작, 로고와 아이콘 제작
            </option>
            <option value="프로젝트 디자인">프로젝트 디자인</option>
            <option value="??">??</option>
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMembers.map((member, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all cursor-pointer"
            onClick={() => setSelectedMember(member)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={member.image}
              alt={member.name}
              width={120}
              height={120}
              className="rounded-full mb-4 border-4 border-blue-600"
            />
            <h2 className="text-xl font-semibold text-blue-600">
              {member.name}
            </h2>
            <p className="text-gray-700">{member.role}</p>
            <div className="flex mt-4 gap-4">
              {member.social.github && (
                <a
                  href={member.social.github}
                  target="_blank"
                  className="text-gray-700 hover:text-blue-600"
                >
                  <FaGithub size={24} />
                </a>
              )}
              {member.social.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  className="text-gray-700 hover:text-blue-600"
                >
                  <FaLinkedin size={24} />
                </a>
              )}
              {member.social.instagram && (
                <a
                  href={member.social.instagram}
                  target="_blank"
                  className="text-gray-700 hover:text-blue-600"
                >
                  <FaInstagram size={24} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-gray-900 rounded-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-900 hover:text-gray-600"
              onClick={() => setSelectedMember(null)}
            >
              ✕
            </button>
            <Image
              src={selectedMember.image}
              alt={selectedMember.name}
              width={120}
              height={120}
              className="rounded-full mx-auto mb-4 border-4 border-blue-600"
            />
            <h2 className="text-3xl font-bold text-center text-blue-600">
              {selectedMember.name}
            </h2>
            <p className="text-lg text-center mt-2">{selectedMember.role}</p>
            <p className="mt-4">{selectedMember.bio}</p>
            <p className="mt-4 flex items-center justify-center">
              <FaEnvelope className="inline mr-2" />
              {selectedMember.email}
            </p>
            <div className="mt-6 flex justify-center gap-4">
              {selectedMember.social.github && (
                <a
                  href={selectedMember.social.github}
                  target="_blank"
                  className="text-gray-900 hover:text-blue-600"
                >
                  <FaGithub size={24} />
                </a>
              )}
              {selectedMember.social.linkedin && (
                <a
                  href={selectedMember.social.linkedin}
                  target="_blank"
                  className="text-gray-900 hover:text-blue-600"
                >
                  <FaLinkedin size={24} />
                </a>
              )}
              {selectedMember.social.instagram && (
                <a
                  href={selectedMember.social.instagram}
                  target="_blank"
                  className="text-gray-900 hover:text-blue-600"
                >
                  <FaInstagram size={24} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
