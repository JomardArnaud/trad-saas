import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import router from './routes/index.js' // Error si je met que './routes/
// Error [ERR_UNSUPPORTED_DIR_IMPORT]: Directory import 'C:\Users\arnau\Documents\Khufu-20220104T025612Z-001\Khufu\trad-saas\routes' is not supported resolving ES modules imported from C:\Users\arnau\Documents\Khufu-20220104T025612Z-001\Khufu\trad-saas\app.js
// Did you mean to import ../routes/index.js?

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
