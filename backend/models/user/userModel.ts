import { model } from 'mongoose';
import { userSchema } from './userSchema';

const userModel = model('user', userSchema);

class User {
  email: String;

  constructor(email: String) {
    this.email = email;
  }

  static format(user){
    const { email } = user

    return {
      email
    }
  }

  static async find(key: string, value: string) {
    const user = await userModel.findOne({ [key]: value });

    return user;
  }

  save() {
    const user = new userModel(this).save();

    return user
  }
}

export default User;
