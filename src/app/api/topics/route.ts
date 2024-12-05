import connectMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { NextRequest, NextResponse } from 'next/server'

// 가능한 카테고리 값들
const validCategories = [
  '가전제품',
  '문구(완구)',
  '장난감',
  '생필품',
  '가구',
  '기타',
]

// POST 메서드: Topic 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, price, category, image, userEmail } = body

    if (!title || !description || !price || !category || !userEmail) {
      return NextResponse.json(
        { message: '상품명, 설명, 가격, 카테고리, 이메일은 모두 필수입니다.' },
        { status: 400 }
      )
    }

    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { message: '유효한 카테고리 값을 선택해 주세요.' },
        { status: 400 }
      )
    }

    const parsedPrice = parseFloat(price)
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return NextResponse.json(
        { message: '유효한 가격을 입력해주세요. (양수 필요)' },
        { status: 400 }
      )
    }

    await connectMongoDB()
    const newTopic = await Topic.create({
      title,
      description,
      price: parsedPrice,
      category,
      image: image || null,
      userEmail,
      views: 0, // 기본 조회수 0으로 설정
    })

    return NextResponse.json(
      { message: 'Topic created successfully', newTopic },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in POST /api/topics:', error)
    return NextResponse.json(
      { message: 'Internal server error in POST' },
      { status: 500 }
    )
  }
}

// GET 메서드: 모든 Topic 조회
export async function GET() {
  try {
    await connectMongoDB()

    const topics = await Topic.find() // 모든 Topic 조회

    return NextResponse.json({ topics }, { status: 200 }) // 조회수 포함된 데이터 반환
  } catch (error) {
    console.error('Error in GET /api/topics:', error)
    return NextResponse.json(
      { message: 'Internal server error in GET' },
      { status: 500 }
    )
  }
}
