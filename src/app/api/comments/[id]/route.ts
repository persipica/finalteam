import { NextResponse } from 'next/server'

import Comment from '@/models/Comment'
import connectMongoDB from '@/libs/mongodb'

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { content } = await req.json()
    const { id } = params

    if (!content) {
      return NextResponse.json(
        { message: 'Content is required to update' },
        { status: 400 }
      )
    }

    await connectMongoDB()

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    )

    if (!updatedComment) {
      return NextResponse.json(
        { message: 'Comment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedComment)
  } catch (error) {
    console.error('Error updating comment:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params

    await connectMongoDB()

    const deletedComment = await Comment.findByIdAndDelete(id)

    if (!deletedComment) {
      return NextResponse.json(
        { message: 'Comment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Comment deleted successfully' })
  } catch (error) {
    console.error('Error deleting comment:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
