import mongoose, { Schema, Model } from 'mongoose'

interface IView {
  topicId: string
  userEmail: string
}

const viewSchema = new Schema<IView>({
  topicId: { type: String, required: true },
  userEmail: { type: String, required: true },
})

let View: Model<IView>
try {
  View = mongoose.model<IView>('View')
} catch {
  View = mongoose.model<IView>('View', viewSchema)
}

export default View
