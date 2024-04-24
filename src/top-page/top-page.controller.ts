import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TopPageModel } from './models';
import { FindTopPageDto } from './dto';

@Controller('top-page')
export class TopPageController {
  @Post('create')
  async create(@Body() dto: Omit<TopPageModel, '_id'>) {
    dto;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    id;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    id;
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() dto: TopPageModel) {
    id;
    dto;
  }

  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    dto;
  }

}
