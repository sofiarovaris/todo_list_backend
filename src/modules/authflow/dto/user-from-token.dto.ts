import { IsEmail } from 'class-validator';

export class UserFromTokenDto {
  @IsEmail()
  email: string;
}
