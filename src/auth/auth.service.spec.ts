import { Test, TestingModule } from '@nestjs/testing';
import { AuthService, TokenType } from './auth.service';
import { User } from './../shared/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from './../config/config.module';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigModule,
        UsersService,
        AuthService,
        JwtService,
        ConfigService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('Should sign user in and return access token', async () => {
      const res: any = {
        cookie: jest.fn(),
        status: jest.fn().mockImplementation(() => res), // chaining
        send: jest.fn().mockImplementation(),
      };

      const user = {
        id: 'f3ac9b0c-2dcf-4270-b16a-6bf7b39db8da',
        email: 'test@test.com',
        password:
          '$2b$10$670erey6XRkwbn2R7kOAH.BevlA29LwUisaiIpXju7s60lyeW2Zxa',
        refreshToken:
          '$2b$10$Sgx9BWKT0zhZ1qkCaH7vGuyyZCHSfmm4GT77t4dt9Oe0qetqajIQW',
        createdAt: '2024-01-18T21:58:35.958Z',
        updatedAt: '2024-01-19T10:37:21.113Z',
        deletedAt: null,
        roles: [],
        validatePassword: jest.fn().mockImplementation((password: string) => {
          if (password === '12345') return true;
          return false;
        }),
      };

      usersService.findByEmail = jest.fn().mockResolvedValue(user);
      (usersService.updateRefreshToken = jest.fn().mockResolvedValue(user)),
        await expect(
          authService.signIn(
            {
              email: 'test@test.com',
              password: '12345',
            },
            res,
          ),
        ).resolves.toEqual({
          token: expect.any(String),
          type: TokenType.ACCESS,
        });

      expect(usersService.findByEmail).toHaveBeenCalledTimes(1);
      expect(usersService.updateRefreshToken).toHaveBeenCalledTimes(1);
      expect(res.cookie).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        token: expect.any(String),
        type: TokenType.ACCESS,
      });
    });
  });
});
