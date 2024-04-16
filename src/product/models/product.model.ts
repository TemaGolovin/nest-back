import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AuthDocument = HydratedDocument<ProductModel>;
@Schema()
export class ProductModel {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  oldPrice: number;

  @Prop({ required: true })
  credit: number;

  @Prop({ required: true })
  calculatedRating: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  advantages: string;

  @Prop({ required: true })
  disAdvantages: string;

  @Prop({ required: true })
  categories: string[];

  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true })
  characteristics: {
    [key: string]: string;
  };

  @Prop({ required: true })
  passwordHash: string;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
