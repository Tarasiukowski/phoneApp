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

    // // const data = await UserModel.update('groups', { email: author, value: { name } }, 'pull');
    // const data = await UserModel.update(
    //   { by: 'email', valueFilter: author },
    //   { key: 'groups', value: [] },
    //   'pull',
    // );

    return { status: 200, data: {} };
  }

  async create(users: string[]) {
    const { author, name } = this;

    // const data = await UserModel.update(
    //   'groups',
    //   { email: author, value: { name, members: users } },
    //   'push',
    // );

    // const data = await UserModel.update(
    //   { by: 'email', valueFilter: author },
    //   { key: 'groups', value: [] },
    //   'push',
    // );

    return { status: 200, data: {} };
  }
}

export default GroupService;
