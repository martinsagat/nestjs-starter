import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../shared/entities/user.entity';
import * as bcrypt from 'bcrypt';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('DELETE FROM `user`;');
    await dataSource.query('ALTER TABLE `user` AUTO_INCREMENT = 1;');

    const repository = dataSource.getRepository(User);
    const password = await bcrypt.hash('secret', 10);
    await repository.insert({
      email: 'test@test.com',
      password: password,
    });

    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(5);
  }
}
