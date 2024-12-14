import mongoose, { Schema, Model } from 'mongoose'

interface IComment {
  content: string
  userEmail: string
  topicId: mongoose.Schema.Types.ObjectId
  createdAt: Date
}

const commentSchema = new Schema<IComment>({
  content: { type: String, required: true },
  userEmail: { type: String, required: true },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
})

let Comment: Model<IComment>
try {
  Comment = mongoose.model<IComment>('Comment')
} catch {
  Comment = mongoose.model<IComment>('Comment', commentSchema)
}

export default Comment
