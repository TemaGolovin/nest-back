import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
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
