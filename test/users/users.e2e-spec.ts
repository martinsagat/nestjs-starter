import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  registerAndLoginTestUser,
  userCredentials,
} from './../utils/auth.utils';
import { AppModule } from './../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('/users (GET)', () => {
    it('Should return 401 when user not logged in', async () => {
      return request(app.getHttpServer()).get('/users').expect(401);
    });

    it('Should return list of users', async () => {
      const token = await registerAndLoginTestUser(app, userCredentials);
      return request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(1);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('email');
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
