import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode, Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto';
import { AuthService } from './auth.service';
import { USER_ALREADY_EXIST } from './auth.constants';
import { Types } from 'mongoose';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(@Body() dto: AuthDto) {
    const oldUser = await this.authService.findUser(dto.email);
    if (oldUser) {
      throw new BadRequestException(USER_ALREADY_EXIST)
    }
    return this.authService.registration(dto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: AuthDto) {
    const { email } = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(email);
  }

  @Delete('delete/:userId')
  async deleteUser (@Param() { userId }: { userId: Types.ObjectId }) {
    return await this.authService.deleteUser(userId);
  }
}
