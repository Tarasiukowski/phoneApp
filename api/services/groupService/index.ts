import UserModel from '../../models/user/userModel';

export const groupService = (author: string, name: string) => ({
  async remove() {
    const data = await (
      await UserModel.findOne('email', author)
    ).update('groups', { name }, 'pull');

    return data;
  },
  async create(users: string[]) {
    const data = await (
      await UserModel.findOne('email', author)
    ).update('groups', { name, members: users }, 'push');

    return data;
  },
});
