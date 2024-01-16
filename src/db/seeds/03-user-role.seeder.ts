import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from './../../shared/entities/role.entity';
import { User } from './../../../src/shared/entities/user.entity';

export default class UserRoleSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('DELETE FROM `user_roles_role`;');
    await dataSource.query('ALTER TABLE `user_roles_role` AUTO_INCREMENT = 1;');

    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);

    const users = await userRepository.find();
    const roles = await roleRepository.find();

    for (const user of users) {
      const randomRoles = roles.sort(() => Math.random() - 0.5).slice(0, 2); // Assign 2 random roles
      user.roles = randomRoles;
    }

    await userRepository.save(users);
  }
}
