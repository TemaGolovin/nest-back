import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { AuthModel } from './models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(@InjectModel(AuthModel.name) private readonly authModel: Model<AuthModel>) {
  }

  async registration (dto: AuthDto) {
    const salt = await genSalt(8);

    const newUser = await new this.authModel({
      email: dto.email,
      passwordHash: await hash(dto.password, salt),
    })
    return await newUser.save();
  }

  async findUser (email: string) {
    return this.authModel.findOne({email: email}).exec();
  }
}
