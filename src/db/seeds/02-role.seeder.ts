import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from './../../shared/entities/role.entity';
import { Role as RoleEnum } from './../../shared/enums/role.enum';

export default class RoleSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('DELETE FROM `role`;');
    await dataSource.query('ALTER TABLE `role` AUTO_INCREMENT = 1;');

    const repository = dataSource.getRepository(Role);

    await repository.insert({
      name: RoleEnum.Admin,
    });

    await repository.insert({
      name: RoleEnum.User,
    });
  }
}
