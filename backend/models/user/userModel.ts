import { model } from 'mongoose';
import { createNumber } from '../../utils/numbers/createNumber'
import { userSchema } from './userSchema';

export const userModel = model('user', userSchema);

class User {
  email: String;
  number: String;

  constructor(email: String) {
    this.email = email;
  }

  static format(user) {
    const { email, number } = user;

    return {
      email,
      number
    };
  }

  static async update(data){
    const { email } = data

    delete data.email
      
    await userModel.updateOne({ email }, { $set: { ...data } } )
  }

  static async find(key: string, value: string) {
    const user = await userModel.findOne({ [key]: value });

    return user;
  }


  async save() {
    this.number = await createNumber()

    const user = new userModel(this).save();

    return user;
  }
}

export default User;
