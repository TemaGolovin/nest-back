import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewModel } from './models';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) { }

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: ReviewModel) {
    return this.reviewService.createReview(dto);
  }

  @Get('byProduct/:productId')
  async getAllByProduct(@Param('productId') productId: string) {
    return this.reviewService.getAllByProductId(productId);
  }

  @Get('all')
  async getAll() {
    return this.reviewService.getAllReviews();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return this.reviewService.deleteReviewByID(id);
  }
}
