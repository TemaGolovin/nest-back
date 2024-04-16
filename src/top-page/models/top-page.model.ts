import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products
}

@Schema()
class HhModel {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;
}

const HhSchema = SchemaFactory.createForClass(HhModel);

@Schema()
class AdvantagesModel {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;
}

const AdvantagesSchema = SchemaFactory.createForClass(AdvantagesModel);



@Schema()
export class TopPageModel {
  @Prop({ required: true })
  firstCategory: TopLevelCategory;

  @Prop({ required: true })
  secondCategory: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: HhSchema })
  hh?: HhModel;

  @Prop({ required: true, type: [AdvantagesSchema] })
  advantages: AdvantagesModel;

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop()
  tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
