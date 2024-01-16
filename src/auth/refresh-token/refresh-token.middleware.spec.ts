import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenMiddleware } from './refresh-token.middleware';

jest.mock('@nestjs/jwt');
jest.mock('bcrypt');

describe('RefreshTokenMiddleware', () => {
  let refreshTokenMiddleware: RefreshTokenMiddleware;
  let jwtServiceMock: jest.Mocked<JwtService>;
  let usersServiceMock: jest.Mocked<UsersService>;
  let configServiceMock: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    jwtServiceMock = new JwtService() as jest.Mocked<JwtService>;
    usersServiceMock = {} as jest.Mocked<UsersService>;
    configServiceMock = {} as jest.Mocked<ConfigService>;

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenMiddleware,
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: UsersService, useValue: usersServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    refreshTokenMiddleware = moduleRef.get<RefreshTokenMiddleware>(
      RefreshTokenMiddleware,
    );
  });

  it('should be defined', () => {
    expect(refreshTokenMiddleware).toBeDefined();
  });
});
