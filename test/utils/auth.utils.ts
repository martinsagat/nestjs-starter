// auth.utils.ts

import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { SignInDto } from '../../src/auth/dto/signin.dto';
import { SignUpDto } from '../../src/auth/dto/signup.dto';

export const userCredentials: { email: string; password: string } = {
  email: 'test@test.com',
  password: 'secret',
};

export async function registerTestUser(
  app: INestApplication,
  userData: SignUpDto,
): Promise<string> {
  const response = await request(app.getHttpServer())
    .post('/auth/register')
    .send(userData);

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty('message');
  return response.body.message;
}

export async function loginTestUser(
  app: INestApplication,
  userData: SignInDto,
): Promise<string> {
  const response = await request(app.getHttpServer())
    .post('/auth/login')
    .send(userData);

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('token');
  expect(response.body).toHaveProperty('type');
  return response.body.token;
}

export async function registerAndLoginTestUser(
  app: INestApplication,
  userCredentials: { email: string; password: string },
): Promise<any> {
  await registerTestUser(app, userCredentials);
  return await loginTestUser(app, userCredentials);
}
