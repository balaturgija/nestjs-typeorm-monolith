import { IsDefined, IsString, IsEmail } from 'class-validator';

export class CreateSubscriberDto {
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  username: string;
}
