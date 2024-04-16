import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ReviewDocument = HydratedDocument<ReviewModel>;
@Schema({ timestamps: true })
export class ReviewModel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel)