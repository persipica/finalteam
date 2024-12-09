import { NextResponse } from 'next/server'
import connectMongoDB from '@/libs/mongodb'
import Board from '@/models/board' // 새로운 Board 모델 필요

export async function POST(request: Request) {
  try {
    const { title, content, image, userEmail } = await request.json()
    await connectMongoDB()
    await Board.create({ title, content, image, userEmail, views: 0 })
    return NextResponse.json(
      { message: '게시글이 작성되었습니다.' },
      { status: 201 }
    )
  } catch (err) {
    console.error('Error creating post:', err)
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectMongoDB()
    const posts = await Board.find().sort({ createdAt: -1 })
    return NextResponse.json(posts)
  } catch (err) {
    console.error('Error ', err)
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 })
  }
}
