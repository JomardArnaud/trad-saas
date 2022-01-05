import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import * as mailSender from '../../utils/sendMail.js'
import User from '../../models/user-model.js'
import TokenUser from '../../models/token-user-model.js'
import * as userController from './user-controller.js'
const router = express.Router()

// 501 error on register
router.post('/user/register', async (req, res, next) => {
  const testUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }
  if (userController.checkUserValidity(testUser)) {
    testUser.password = await bcrypt.hash(testUser.password, 10)
    console.log(testUser.password)
    const newUser = new User({
      username: req.body.username,
      password: testUser.password,
      email: req.body.email
    })
    newUser.save((saveErr, savedUser) => {
      if (saveErr) {
        res.status(502).send({ errorData: saveErr, errorMessage: 'Error during save on database' })
      }
      res.status(201).send({ data: savedUser })
    })
  } else {
    res.status(501).json({
      errorCode: 501, // mais c'est un nombre random peu importe
      errorMessage: "user's information invalid"
    })
  }
})

// 503 error on login
router.get('/user/login', async (req, res) => {
  if (!userController.checkUsernameValidity(req.body.username) || !userController.checkPasswordValidity(req.body.password)) {
    res.status(503).send({ errorMessage: 'username/password not valid arguments' })
  }
  const username = req.body.username
  const password = req.body.password

  const user = await User.findOne({ username }).lean()
  console.log(password)
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        username: username,
        id: user._id
      },
      process.env.JWT_SECRET
    )
    return res.status(201).send({ status: 'login successfully', data: token })
  }
  return res.status(503).send({ status: 'errorAfter', error: 'wrong combo login/password' })
})

router.post('/user/auth/change-password', async (req, res) => {
  const newPassword = req.body.newPassword

  if (!newPassword || typeof newPassword !== 'string') {
    return res.json({ status: 'error', error: 'Invalid password' })
  }
  const password = await bcrypt.hash(newPassword, 10)
  console.log(req.user)
  User.updateOne({ _id: req.user.id }, { $set: { password: password } }, (err, user) => {
    if (err) {
      return res.json({ status: 'error', message: err.message })
    } else {
      return res.json({ status: 'success', message: JSON.stringify(user) })
    }
  })
})

router.post('/user/lost-password', async (req, res) => {
  if (!userController.checkEmailValidity(req.body.email)) { res.json({ status: 'error', messageError: 'wrong email' }) }
  const user = await User.findOne({ email: req.body.email })
  if (!user) { return res.status(400).send("user with given email doesn't exist") }

  let token = await TokenUser.findOne({ userId: user._id })
  if (!token) {
    token = await new TokenUser({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex')
    }).save()
  }
  console.log(user.email)
  const link = `http://localhost:3000/user/password-reset/${user._id}/${token.token}`
  await mailSender.sendEmail(user.email, 'Password reset', link)

  res.send('password reset link sent to your email account')
})

router.post('/user/password-reset/:userId/:token', async (req, res) => {
  const user = await User.findById(req.params.userId)
  if (!user) return res.status(400).send('invalid link or expired')

  const token = await TokenUser.findOne({
    userId: user._id,
    token: req.params.token
  })
  if (!token) return res.status(400).send('Invalid link or expired')

  user.password = await bcrypt.hash(req.body.password, 10)
  await user.save()
  await token.delete()

  res.send('password reset sucessfully.')
})

// router.put('/user/:id', async (req, res) => {
//   const updateUser = await User.updateOne(
//     { _id: req.params.id },
//     req.body
//   )
//   res.json(updateUser)
// })

// router.delete('/user/createAfter', async (req, res) => {
//   const removedUser = await User.deleteMany(
//     { password: { $gte: req.body.password } }
//   )
//   res.json(removedUser)
// })

// // to do demander comment bien utiliser les filtres
// // validators
// router.delete('/user/:id', async (req, res) => {
//   const filters = {
//     _id: req.params.id,
//     toto: Boolean(req.body.toto)
//   }

//   const removedUser = await User.deleteOne(filters)
//   res.json(removedUser)
// })

export default router
