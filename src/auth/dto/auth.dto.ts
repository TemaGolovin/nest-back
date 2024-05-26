import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @Min(6, {
    message: "Пароль должен быть не менее 6 символов"
  })
  @IsString()
  password: string;
}
