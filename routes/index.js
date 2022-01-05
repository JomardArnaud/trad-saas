import express from 'express'
import homeRoute from './home/home-route.js'
import projectRoute from './project/project-route.js'
import userRoute from './user/user-route.js'
import authRoute from './auth/auth-route.js'

const router = express.Router()

router.use('/', authRoute)
router.use('/', userRoute)
router.use('/', homeRoute)
router.use('/', projectRoute)

export default router
