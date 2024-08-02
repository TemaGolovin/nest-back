import { TopLevelCategory } from '../models';
import { IsEnum, IsNumber, IsString, ValidateNested, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class HhModel {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  seniorSalary: number;
}

class AdvantagesDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}


export class CreateTopPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @ValidateNested()
  @Type(() => HhModel)
  @IsOptional()
  hh?: HhModel;


  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => AdvantagesDto)
  advantages: AdvantagesDto[];

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
