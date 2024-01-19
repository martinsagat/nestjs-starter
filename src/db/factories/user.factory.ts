import {
  FactoryCallback,
  SeederFactoryItem,
  setSeederFactory,
} from 'typeorm-extension';
import { User } from './../../shared/entities/user.entity';

export const userFactoryCallback: FactoryCallback<User, unknown> = (faker) => {
  const user = new User();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  return user;
};

export const UsersFactory: SeederFactoryItem = setSeederFactory(
  User,
  userFactoryCallback,
);
