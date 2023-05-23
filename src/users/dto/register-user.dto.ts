import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}
