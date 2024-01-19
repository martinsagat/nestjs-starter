import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Authentication', () => {
    it('Should register user', async () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'test@test.com',
          password: 'password',
        })
        .expect(201);
    });

    it('Should return message if user already exists', async () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'test@test.com',
          password: 'password',
        })
        .expect(409);
    });

    // it('Should fail to register user if email is not valid', async () => {
    //     return request(app.getHttpServer()).post('/auth/register').send({
    //         email: 'test.com',
    //         password: 'password'
    //     }).expect(400);
    // });

    it('Should login', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@test.com',
          password: 'password',
        })
        .expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
