import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './../shared/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from 'src/shared/entities/role.entity';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
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
    userRepository = moduleRef.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  // describe('create', () => {
  //   it('should create a new user', async () => {
  //     const role: Role = {
  //       id: '1',
  //       name: 'user',
  //     };

  //     await usersService.create(
  //       {
  //         email: 'test@test.com',
  //         password: 'password',
  //       },
  //       [role],
  //     );

  //     expect(userRepository.save).toHaveBeenCalledTimes(1);
  //     expect(userRepository.save).toHaveBeenCalledWith({
  //       email: 'test@test.com',
  //       password: 'password',
  //       roles: [
  //         {
  //           id: '1',
  //           name: 'user',
  //         },
  //       ],
  //     });
  //   });

  //   it('should throw an error if user already exists', async () => {
  //     userRepository.findOne = jest.fn().mockResolvedValue({
  //       id: '1',
  //       email: 'test@test.com',
  //       password: 'password',
  //     });

  //     await expect(
  //       usersService.create(
  //         {
  //           email: 'test@test.com',
  //           password: 'password',
  //         },
  //         [],
  //       ),
  //     ).rejects.toThrow('User with the same email already exists');

  //     expect(userRepository.findOne).toHaveBeenCalledTimes(1);
  //     expect(userRepository.findOne).toHaveBeenCalledWith({
  //       where: { email: 'test@test.com' },
  //       withDeleted: true,
  //     });
  //     expect(userRepository.save).toHaveBeenCalledTimes(0);
  //   });
  // });
});
