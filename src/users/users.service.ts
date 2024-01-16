import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './../auth/dto/signup.dto';
import { User } from './../shared/entities/user.entity';
import { Role } from './../shared/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['roles'] });
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  async findByRefreshToken(refreshToken: string): Promise<User> {
    return this.userRepository.findOne({
      where: { refreshToken },
      relations: ['roles'],
    });
  }

  async create(signUpData: SignupDto, roles: Role[]) {
    const existingUser = await this.userRepository.findOne({
      where: { email: signUpData.email },
      withDeleted: true,
    });

    if (existingUser)
      throw new ConflictException('User with the same email already exists');

    const user = new User();
    user.email = signUpData.email;
    user.password = signUpData.password;
    user.roles = roles;
    return this.userRepository.save(user);
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    user.refreshToken = refreshToken;
    return this.userRepository.save(user);
  }
}
