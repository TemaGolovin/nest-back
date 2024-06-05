import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductModel, ProductDocument } from './models';
import mongoose, { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto';
import { ReviewModel, ReviewSchema } from '../review/models';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name) private productModel: Model<ProductDocument>
  ) { }

  async createProduct(dto: CreateProductDto) {
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
    return this.productModel.findByIdAndDelete(id);
  }

  async updateOne(id: string, dto: CreateProductDto) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async findWithReview(dto: FindProductDto) {
    return await this.productModel.aggregate([
      {
        $match: {
          categories: dto.category,
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $limit: dto.limit,
      },
      {
        $lookup: {
          from: mongoose.model(ReviewModel.name, ReviewSchema).collection.name,
          localField: "_id",
          foreignField: "productId",
          as: "reviews"
        },
      },
      {
        $addFields: {
          reviewCount: { $size: "$reviews" },
          reviewsAvg: { $avg: "$reviews.rating" },
          reviews: {
            $function: {
              body: `function (reviews) {
                reviews.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
                return reviews;
              }`,
              args: ["$reviews"],
              lang: "js",
            }
          }
        }
      }
    ]).exec() as (ProductModel & { reviews: ReviewModel[], reviewCount: number, reviewsAvg: number })[];
  }
}
