import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {

  @UsePipes(new ValidationPipe())
  @Post('registration')
  registration(@Body() dto: AuthDto) {
    dto
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: AuthDto) {
    dto
  }
}
