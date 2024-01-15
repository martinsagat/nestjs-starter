import { IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
