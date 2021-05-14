import { Response, Request } from 'express';

import { Class } from '../../../interface'

export function FriendsControllerMixin<Base extends Class>(base: Base){
  return class extends base {
    async friends(req: Request, res: Response) {
      const data = {
        status: "ok"
      }
  
      res.send(data);
    }
  }
}