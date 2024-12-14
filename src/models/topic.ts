import mongoose, { Schema, Model } from 'mongoose'

interface ITopic {
  title: string
  description: string
  price: number
  image?: string
  userEmail: string
  category: string
  views?: number
  createdAt?: Date
  updatedAt?: Date
  status: string
}

const topicSchema = new Schema<ITopic>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    userEmail: { type: String, required: true },
    category: { type: String, required: true },
    views: { type: Number, default: 0 },
    status: { type: String, default: '판매중' },
  },
  {
    timestamps: true,
  }
)

let Topic: Model<ITopic>
try {
  Topic = mongoose.model<ITopic>('Topic')
} catch {
  Topic = mongoose.model<ITopic>('Topic', topicSchema)
}

export default Topic
