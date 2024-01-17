import { IsNotEmpty, IsNumber, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

class EnvironmentalVariables {
  @IsNotEmpty()
  @IsNumber()
  APP_PORT: number;

  @IsNotEmpty()
  DB_HOST: string;

  @IsNotEmpty()
  @IsNumber()
  DB_PORT: number;

  @IsNotEmpty()
  DB_NAME: string;

  @IsNotEmpty()
  DB_USER: string;

  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsNotEmpty()
  DB_SYNC: boolean;

  @IsNotEmpty()
  DB_LOGGING: boolean;

  @IsNotEmpty()
  JWT_ACCESS_SECRET_KEY: string;

  @IsNotEmpty()
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: string;

  @IsNotEmpty()
  JWT_REFRESH_SECRET_KEY: string;

  @IsNotEmpty()
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentalVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
