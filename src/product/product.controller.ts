import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto';

@Controller('product')
export class ProductController {
  @Post('create')
  async create(@Body() dto: Omit<ProductModel, '_id'>) {
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
  async updateOne (@Param('id') id: string, @Body() dto: ProductModel) {
    id;
    dto;
  }

  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    dto;
  }
}
