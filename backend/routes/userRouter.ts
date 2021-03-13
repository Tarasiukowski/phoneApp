import { Router } from 'express'
import { userController } from '../controllers/userController'

export const userRouter = Router()

userRouter
  .post('/update', userController.update)