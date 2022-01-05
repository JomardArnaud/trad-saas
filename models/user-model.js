import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  name: String,
  password: String,
  project: [Number],
  email: String,
  created_at: {
    type: Date,
    default: new Date()
  }
})

export default mongoose.model('User', UserSchema)
