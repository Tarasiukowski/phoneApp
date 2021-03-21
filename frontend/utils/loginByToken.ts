import axios from 'axios';
import { User } from '../interfaces/index';

export const loginByToken = async (req: any): Promise<User> => {
  let user;

  const token = req ? req.cookies['SESSID'] : null;

  if (token) {
    const { data } = await axios.post('http://localhost:7000/auth/byToken', {
      token,
    });

    user = data.user;
  }

  return user ? user : null;
};
