import { IsString, MinLength, IsEmail, IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message:
      'Password should contains 8 characters with at least one special character',
  })
  password: string;
}
