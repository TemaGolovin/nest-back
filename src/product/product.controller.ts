import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ProductModel } from './models';
import { FindProductDto } from './dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() dto: ProductModel) {
    return this.productService.createProduct(dto);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.productService.getOneById(id);
  }

  @Get()
  async getAll() {
    return this.productService.getAllProducts();
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return this.productService.deleteProductByID(id);
  }

  @Patch(':id')
  async updateOne (@Param('id') id: string, @Body() dto: ProductModel) {
    return this.productService.updateOne(id, dto);
  }

  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    dto;
  }
}
