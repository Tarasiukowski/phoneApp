import UserModel from '../../models/user/userModel';

class GroupService {
  author: string;
  name: string;
  users: string[];

  constructor(author: string, name: string, users: string[]) {
    this.author = author;
    this.name = name;
    this.users = users;
  }

  async create() {
    const { author, name, users } = this;

    const data = await UserModel.update(
      { email: author, field: 'groups', value: { name, members: users } },
      'push',
    );

    return data;
  }
}

export default GroupService;
