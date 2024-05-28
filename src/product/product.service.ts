import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductModel, ProductDocument } from './models';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name) private productModel: Model<ProductDocument>
  ) { }

  async createProduct(dto: ProductModel) {
    const newProduct = new this.productModel(dto);
    return newProduct.save();
  }

  async getOneById(id: string) {
    return this.productModel.findOne({ _id: id });
  }

  async getAllProducts() {
    return this.productModel.find();
  }

  async deleteProductByID(id: string) {
    return this.productModel.deleteOne({ _id: id });
  }

  async updateOne(id: string, dto: ProductModel) {
    return this.productModel.updateOne({ _id: id }, dto);
  }
}
