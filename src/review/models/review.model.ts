import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema, Types } from "mongoose";
import { ProductModel } from '../../product/models';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export type ReviewDocument = HydratedDocument<ReviewModel>;
@Schema({ timestamps: true })
export class ReviewModel {

  @IsString()
  @Prop({ required: true })
  name: string;

  @IsString()
  @Prop({ required: true })
  title: string;

  @IsString()
  @Prop({ required: true })
  description: string;

  @Max(5, {
    message: "Рейтинг должен быть не более 5"
  })
  @Min(1)
  @IsNumber()
  @Prop({ required: true })
  rating: number;

  @IsString()
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: ProductModel.name })
  productId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel)
