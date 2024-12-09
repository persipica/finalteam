import { NextRequest, NextResponse } from 'next/server'
import connectMongoDB from '@/libs/mongodb'
import Board from '@/models/board'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB()
    const board = await Board.findById(params.id)

    if (!board) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 })
    }

    // 조회수 증가
    board.views = (board.views || 0) + 1
    await board.save()

    return NextResponse.json(board)
  } catch (err) {
    console.error('Error fetching board:', err)
    return NextResponse.json({ error: 'Error fetching board' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { title, content, image } = await req.json()

    await connectMongoDB()

    const updatedBoard = await Board.findByIdAndUpdate(
      id,
      { title, content, image },
      { new: true }
    )

    if (!updatedBoard) {
      return NextResponse.json(
        { message: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedBoard)
  } catch (err) {
    // error를 err로 변경하고 콘솔에 로깅
    console.error('Error updating board:', err)
    return NextResponse.json(
      { message: 'ê²ìê¸ ìì  ì¤ ì¤ë¥ê° ë°ìíìµëë¤.' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    await connectMongoDB()

    const deletedBoard = await Board.findByIdAndDelete(id)

    if (!deletedBoard) {
      return NextResponse.json(
        { message: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: '게시글이 삭제되었습니다.' })
  } catch (err) {
    // error를 err로 변경하고 콘솔에 로깅
    console.error('Error deleting board:', err)
    return NextResponse.json(
      { message: 'ê²ìê¸ ì­ì  ì¤ ì¤ë¥ê° ë°ìíìµëë¤.' },
      { status: 500 }
    )
  }
}
