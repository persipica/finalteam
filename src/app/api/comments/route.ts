import { NextResponse } from 'next/server'
import Comment from '@/models/Comment'
import Topic from '@/models/topic'
import connectMongoDB from '@/libs/mongodb'

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url)
    const topicId = url.searchParams.get('topicId')

    if (!topicId) {
      return NextResponse.json(
        { message: 'Topic ID is required' },
        { status: 400 }
      )
    }

    await connectMongoDB()

    const topic = await Topic.findById(topicId)
    if (!topic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 })
    }

    const comments = await Comment.find({ topicId }).sort({ createdAt: -1 })

    return NextResponse.json({
      comments,
      sellerEmail: topic.userEmail,
    })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const POST = async (req: Request) => {
  try {
    const { content, userEmail, topicId } = await req.json()

    if (!content || !userEmail || !topicId) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    await connectMongoDB()

    const newComment = new Comment({
      content,
      userEmail,
      topicId,
    })

    await newComment.save()

    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
