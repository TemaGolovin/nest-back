import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { AuthModel } from './models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSalt, genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(@InjectModel(AuthModel.name) private readonly authModel: Model<AuthModel>) {
  }

  async registration (dto: AuthDto) {
    const salt = genSaltSync(8);

    const newUser = new this.authModel({
      email: dto.email,
      passwordHash: hashSync(dto.password, salt),
    })
    return await newUser.save();
  }

  async findUser (email: string) {
    return this.authModel.findOne({email: email}).exec();
  }
}
