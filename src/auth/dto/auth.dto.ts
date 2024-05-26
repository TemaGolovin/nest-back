import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @MinLength(6, {
    message: "Пароль должен быть не менее 6 символов"
  })
  @IsString()
  password: string;
}
