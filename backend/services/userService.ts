import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserModel from '../models/user/userModel';

class UserService {
  email: string;

  constructor(email: string) {
    this.email = email;
  }

  static async verify(token: string, res: Response) {
    const { id } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    const user = await UserModel.find('_id', id);

    const formatUser = UserModel.format(user);

    res.send({ user: formatUser });
  }

  async login(res: Response) {
    const { email } = this;

    const user = await UserModel.find('email', email);

    if (user) {
      const { _id } = user;

      const token = jwt.sign({ id: _id }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: 9999999,
      });

      const formatUser = UserModel.format(user);

      res.cookie('SESSID', token, { maxAge: 900000, httpOnly: true });
      res.send({ user: formatUser });

      return;
    }

    res.send({ errorMsg: 'user with such email does not exist' });
  }

  async singup(res: Response) {
    const { email } = this;

    const findUser = await UserModel.find('email', email);

    if (findUser) {
      return res.send({ errorMsg: 'user with that email address exists' });
    }

    const user = await new UserModel(email).save();

    const { _id } = user;

    const token = jwt.sign({ id: _id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: 9999999,
    });

    const fromatUser = UserModel.format(user);

    res.cookie('SESSID', token, { maxAge: 900000, httpOnly: true });
    res.send({ user: fromatUser });
  }
}

export default UserService;
