import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IsString, Min } from 'class-validator';

export type AuthDocument = HydratedDocument<AuthModel>;
@Schema()
export class AuthModel {
  @IsString()
  @Prop({ required: true, unique: true })
  email: string;

  @IsString()
  @Min(6, {
    message: "Пароль должен быть не менее 6 символов"
  })
  @Prop({ required: true })
  passwordHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
