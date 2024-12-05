import mongoose, { Connection } from 'mongoose'

export default async function connectMongoDB(): Promise<{ db: Connection }> {
  if (mongoose.connection.readyState >= 1) {
    console.log('Already connected to MongoDB')
    return { db: mongoose.connection }
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('Connected to MongoDB')
    return { db: mongoose.connection }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw new Error('Failed to connect to MongoDB')
  }
}
