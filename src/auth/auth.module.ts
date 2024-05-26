import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel, AuthSchema } from './models';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [MongooseModule.forFeature([{ name: AuthModel.name, schema: AuthSchema }])],
  providers: [AuthService],
})
export class AuthModule { }
