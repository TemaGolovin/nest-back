import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewDocument, ReviewModel } from './models';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel.name) private reviewModel: Model<ReviewDocument>
  ) { }

  createReview(dto: Omit<ReviewModel, '_id'>) {
    const newReview = new this.reviewModel(dto);
    return newReview.save();
  }

  getAllReviews() {
    return this.reviewModel.find();
  }

  async deleteReviewByID(id: string) {
    return this.reviewModel.deleteOne({ _id: id });
  }

  async getAllByProductId(productId: string) {
    return this.reviewModel.find({ productId }).exec();
  }
}
