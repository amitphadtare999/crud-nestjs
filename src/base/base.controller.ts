import {
  Post,
  Get,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { BaseService } from './base.service';
import { FetchRequestDto } from './dto/base-filter-dto';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
export abstract class BaseController<T, S extends BaseService<T>> {
  constructor(protected readonly service: S) {}

  @HttpCode(HttpStatus.OK)
  @Post('all')
  findAll(@Body() fetchDto: FetchRequestDto): Promise<T[]> {
    console.log('filterDto', fetchDto);

    return this.service.findAll(fetchDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<T> {
    return this.service.findOne(id);
  }
}
