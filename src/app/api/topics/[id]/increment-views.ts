import { ObjectId } from 'mongodb'
import connectMongoDB from '@/libs/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

const incrementViews = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const { userEmail } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  if (!id || !userEmail) {
    return res.status(400).json({ error: 'Invalid request' })
  }

  try {
    const { db } = await connectMongoDB()

    const objectId = new ObjectId(id as string)

    const result = await db
      .collection('topics')
      .updateOne({ _id: objectId }, { $inc: { views: 1 } })

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Topic not found' })
    }

    return res.status(200).json({ message: 'Views incremented successfully' })
  } catch (error) {
    console.error('Error incrementing views:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default incrementViews
