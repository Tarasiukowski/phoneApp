import { Response, Request } from 'express'
import UserService from '../services/userService'

class UserController {
  update(req: Request, res: Response){
    const body = req.body

    UserService.update(body, res)
  }
}

export const userController = new UserController()