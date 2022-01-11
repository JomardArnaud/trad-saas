import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

// 504 error on token authentication
router.use('/user/auth', (req, res, next) => {
  console.log('getting on /user/auth')
  jwt.verify(req.headers.token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(504).send({ errorData: err, errorMessage: 'logging failed' })
    } else {
      req.user = user
      next()
    }
  })
})

export default router
