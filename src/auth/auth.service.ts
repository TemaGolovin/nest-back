import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto';
import { AuthModel } from './models';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { NOT_EXIST_EMAIL, PASSWORD_INCORRECT } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel.name) private readonly authModel: Model<AuthModel>,
    private readonly jwtService: JwtService,
  ) {
  }

  async registration (dto: AuthDto) {
    const salt = await genSalt(8);

    const newUser = await new this.authModel({
      email: dto.email,
      passwordHash: await hash(dto.password, salt),
    })

    const { token } = await this.getAccessToken(dto.email);

    const newUserData = await newUser.save();
    return {
      email: newUserData.email,
      token,
      _id: newUserData._id,
    }
  }

  async login (email: string) {
    return await this.getAccessToken(email);
  }

  async deleteUser (userId: Types.ObjectId) {
    const deletedUser= await this.authModel.findOneAndDelete({_id: userId}).exec();
    if (!deletedUser) {
      throw new BadRequestException('Пользователь с таким id не найден');
    }
    return deletedUser;
  }

  async getAccessToken(email: string) {
    const payload = {
      email,
    }
    return {
      token: await this.jwtService.signAsync(payload),
    }
  }

  async findUser (email: string) {
    return this.authModel.findOne({email: email}).exec();
  }

  async validateUser (email: string, password: string) {
    const user = await this.findUser(email);

    if (!user) {
      throw new UnauthorizedException(NOT_EXIST_EMAIL);
    }

    const isCorrectPass = await compare(password, user.passwordHash);
    if (!isCorrectPass) {
      throw new UnauthorizedException(PASSWORD_INCORRECT);
    }

    return {
      email: user.email,
    }
  }
}
