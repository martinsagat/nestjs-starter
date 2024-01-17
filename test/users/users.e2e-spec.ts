import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../../src/shared/entities/user.entity';
import { UsersService } from '../../src/users/users.service';
import { Role } from './../../src/shared/entities/role.entity';
import {
  loginTestUser,
  registerTestUser,
  userCredentials,
} from './../utils/auth.utils';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../../src/users/users.module';
import { AuthModule } from '../../src/auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../../src/config/config.module';
import { createDatabaseConfig } from '../../src/config/database.config';
import { RoleModule } from '../../src/role/role.module';

import { SeederFactoryManager } from 'typeorm-extension';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        RoleModule,
        AuthModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            ...createDatabaseConfig(configService),
            entities: [User, Role],
          }),
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([User, Role]),
      ],
      providers: [
        UsersService,
        JwtService,
        ConfigService,
        SeederFactoryManager,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/users (GET)', async () => {
    await registerTestUser(app, userCredentials);
    const jwtToken = await loginTestUser(app, userCredentials);

    const usersResponse = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(usersResponse.status).toBe(200);
    expect(Array.isArray(usersResponse.body)).toBe(true);
    expect(usersResponse.body.length).toBe(1);
  });

  afterAll(async () => {
    await app.close();
  });
});
