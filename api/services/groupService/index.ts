import UserModel from '../../models/user/userModel';

class GroupService {
  author: string;
  name: string;

  constructor(author: string, name: string) {
    this.author = author;
    this.name = name;
  }

  async remove() {
    const { author, name } = this;

    const data = await UserModel.update('groups', { email: author, value: { name } }, 'pull');

    return data;
  }

  async create(users: string[]) {
    const { author, name } = this;

    const data = await UserModel.update(
      'groups',
      { email: author, value: { name, members: users } },
      'push',
    );

    return data;
  }
}

export default GroupService;
