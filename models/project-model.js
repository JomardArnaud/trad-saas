import mongoose from 'mongoose'

const ProjectSchema = mongoose.Schema({
  language: [String],
  createdBy: String,
  // defaut de met les key direct dans larray trad et pas à part ?
  trad: [{
    keyName: String,
    createdBy: String,
    updatedBy: String,
    updatedAt: {
      type: Date,
      default: new Date()
    }
  }],
  status: {
    type: String,
    enum: {
      values: ['ongoing', 'archived', 'onhold'],
      message: 'VALUE is not supported'
    }
  }
})

export default mongoose.model('Project', ProjectSchema)
