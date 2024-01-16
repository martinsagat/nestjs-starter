import { setSeederFactory } from 'typeorm-extension';
import { User } from './../../shared/entities/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  return user;
});
