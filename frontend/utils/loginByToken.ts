import axios from 'axios';
import Cookies from 'cookies';
import { User } from '../interfaces/index'

export const loginByToken = async (req: any, res: any): Promise<User> => {
  let user;

  const cookies = new Cookies(req, res);
  const token = cookies.get('SESSID');

  if (token) {
    const { data } = await axios.post('http://localhost:7000/auth/verify', {
      token,
    });

    user = data.user;
  }

  return user ? user : null;
};