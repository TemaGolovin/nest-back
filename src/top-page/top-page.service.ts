import { Injectable } from '@nestjs/common';
import { CreateTopPageDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { TopLevelCategory, TopPageModel } from './models';
import { Model } from 'mongoose';

@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPageModel.name) private readonly topPageModel: Model<TopPageModel>){}

  async create(createTopPageDto: CreateTopPageDto) {
    const newTopPageInfo = new this.topPageModel(createTopPageDto);
    return await newTopPageInfo.save();
  }

  async getOneById(id: string) {
    return this.topPageModel.findOne({ _id: id }).exec();
  }

  async getOneByAlias(alias: string) {
    return this.topPageModel.findOne({ alias }).exec();
  }

  async deleteOneById(id: string) {
    return this.topPageModel.findByIdAndDelete({ _id: id }).exec();
  }

  async updateOne(id: string, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate({ _id: id }, dto, { new: true }).exec();
  }

  async findTopPage(firstCategory: TopLevelCategory) {
    return this.topPageModel.find({ firstCategory }, {secondCategory: 1, alias: 1, title: 1}).exec()
  }
}
