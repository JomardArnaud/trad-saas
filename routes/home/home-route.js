import express from 'express'

const router = express.Router()

router.get('/', async (_req, res) => {
  // if (err) {
  //     res.json({message: err})
  // } else {
  res.json('hello world')
  // }
})

export default router
