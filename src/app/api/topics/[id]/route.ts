/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server'
import Topic from '@/models/topic'
import connectMongoDB from '@/libs/mongodb'
import View from '@/models/view' // 조회 기록 모델
import fs from 'fs'
import path from 'path'

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectMongoDB()

    const topic = await Topic.findById(params.id)
    if (!topic) {
      return NextResponse.json(
        { message: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const userEmail = req.headers.get('x-user-email') // 헤더에서 사용자 이메일 가져오기
    if (userEmail) {
      // 조회 기록 확인
      const existingView = await View.findOne({ topicId: params.id, userEmail })
      if (!existingView) {
        // 조회수 증가 및 조회 기록 생성
        topic.views = (topic.views || 0) + 1
        await topic.save()

        await View.create({ topicId: params.id, userEmail })
        console.log(`조회수 증가: ${topic.views}, 사용자: ${userEmail}`)
      } else {
        console.log(`조회수 증가 건너뜀 (이미 조회됨): 사용자 ${userEmail}`)
      }
    } else {
      console.log('사용자 이메일 없음. 조회수 증가 건너뜀.')
    }

    return NextResponse.json(topic) // 상품 정보를 JSON으로 반환
  } catch (error) {
    console.error('조회수 증가 중 오류 발생:', error)
    return NextResponse.json(
      { message: '상품 정보 조회 중 오류 발생' },
      { status: 500 }
    )
  }
}

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectMongoDB()
    const { id } = params
    const { userEmail } = await req.json()

    if (!userEmail) {
      return NextResponse.json(
        { message: '사용자 이메일이 필요합니다.' },
        { status: 400 }
      )
    }

    const topic = await Topic.findById(id)
    if (!topic) {
      return NextResponse.json(
        { message: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 이미 조회한 사용자인지 확인
    const existingView = await View.findOne({ topicId: id, userEmail })
    if (!existingView) {
      // 조회수 증가 및 조회 기록 저장
      topic.views = (topic.views || 0) + 1
      await topic.save()

      await View.create({ topicId: id, userEmail })
      console.log(`조회수 증가: ${topic.views}, 사용자: ${userEmail}`)
    } else {
      console.log(`조회수 증가 건너뜀 (이미 조회됨): 사용자 ${userEmail}`)
    }

    return NextResponse.json(
      { message: '조회수가 성공적으로 증가했습니다.', views: topic.views },
      { status: 200 }
    )
  } catch (error) {
    console.error('조회수 증가 중 오류 발생:', error)
    return NextResponse.json(
      { message: '조회수 증가 중 오류 발생' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id

  try {
    const body = await req.json()
    const { title, description, price, category, image } = body

    if (!title || !description || !price || !category) {
      return NextResponse.json(
        { message: '모든 필드를 채워주세요.' },
        { status: 400 }
      )
    }

    await connectMongoDB()

    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      { title, description, price, category, image },
      { new: true }
    )

    if (!updatedTopic) {
      return NextResponse.json(
        { message: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: '상품이 성공적으로 수정되었습니다.', updatedTopic },
      { status: 200 }
    )
  } catch (error) {
    console.error('상품 수정 중 오류 발생:', error)
    return NextResponse.json(
      { message: '상품 수정 중 오류 발생' },
      { status: 500 }
    )
  }
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const topic = await Topic.findById(params.id)
    if (!topic) {
      return NextResponse.json(
        { message: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    if (topic.image) {
      const imagePath = path.join(
        process.cwd(),
        'public',
        topic.image.replace('/uploads/', '')
      )
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
    }

    await Topic.findByIdAndDelete(params.id)

    return NextResponse.json(
      { message: '상품이 삭제되었습니다.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('상품 삭제 중 오류 발생:', error)
    return NextResponse.json(
      { message: '상품 삭제 중 오류 발생' },
      { status: 500 }
    )
  }
}
