import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes, ValidationPipe,
} from '@nestjs/common';
import { FindProductDto } from './dto';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PRODUCT_NOT_FOUND } from './product.constants';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Get(':id')
  async getOne(@Param('id', IdValidationPipe) id: string) {
    const product = this.productService.getOneById(id);
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
    return product;
  }

  @Get()
  async getAll() {
    return this.productService.getAllProducts();
  }

  @Delete(':id')
  async deleteOne(@Param('id', IdValidationPipe) id: string) {
    const deletedProduct = this.productService.deleteProductByID(id);
    if (!deletedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
    return deletedProduct;
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async updateOne (@Param('id', IdValidationPipe) id: string, @Body() dto: CreateProductDto) {
    const updatedProduct = this.productService.updateOne(id, dto);
    if (!updatedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
    return updatedProduct;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    return this.productService.findWithReview(dto)
  }
}
