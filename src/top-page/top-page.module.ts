import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageModel, TopPageSchema } from './models';

@Module({
  controllers: [TopPageController],
  imports: [MongooseModule.forFeature([{ name: TopPageModel.name, schema: TopPageSchema }])],
})
export class TopPageModule { }
