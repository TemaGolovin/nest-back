import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel, AuthSchema } from './models';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../configs/jwt.config';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{ name: AuthModel.name, schema: AuthSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig
    })
  ],
  providers: [AuthService],
})
export class AuthModule { }
