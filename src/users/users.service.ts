import { Injectable } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      roles: [Role.User, Role.Admin],
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      roles: [Role.Admin, Role.User],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
