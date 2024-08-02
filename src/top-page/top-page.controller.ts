import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { CreateTopPageDto, FindTopPageDto } from './dto';
import { TopPageService } from './top-page.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { ID_NOT_FOUND_ERROR } from './top-page.constants';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @Get(':id')
  async getOne(@Param('id', IdValidationPipe) id: string) {
    const topPageInfo = await this.topPageService.getOneById(id);
    if (!topPageInfo) {
      throw new BadRequestException(ID_NOT_FOUND_ERROR);
    }
    return topPageInfo;
  }

  @Get('byAlias/:alias')
  async getOneByAlias(@Param('alias') alias: string) {
    const topPageInfo = await this.topPageService.getOneByAlias(alias);
    if (!topPageInfo) {
      throw new BadRequestException(ID_NOT_FOUND_ERROR);
    }
    return topPageInfo;
  }

  @Delete(':id')
  async deleteOne(@Param('id', IdValidationPipe) id: string) {
    const deletedTopPage = await this.topPageService.deleteOneById(id);
    if (!deletedTopPage) {
      throw new NotFoundException(ID_NOT_FOUND_ERROR);
    }
    return deletedTopPage;
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async updateOne(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
    const updatedTopPage = await this.topPageService.updateOne(id, dto);
    if (!updatedTopPage) {
      throw new NotFoundException(ID_NOT_FOUND_ERROR);
    }
    return updatedTopPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return await this.topPageService.findTopPage(dto.firstCategory);
  }

}
