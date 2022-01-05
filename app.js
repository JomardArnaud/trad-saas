import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import router from './routes/index.js'

dotenv.config({ silent: process.env.NODE_ENV === 'production' })

// setting app
const app = express()
app.use(bodyParser.json())
app.use('/', router)

// Connect to server
const url = process.env.DB_URL
mongoose.connect(url, { useNewUrlParser: true })

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

app.use('/', (_req, res) => {
  res.status(404).json({
    errorCode: 404, // mais c'est un nombre random peut importe
    errorTranslateKey: 'ERROR_NOT_FOUND', // translate key si le mec translate le message
    errorMessage: 'Path don\'t exist'
  })
})

app.listen(3000)
