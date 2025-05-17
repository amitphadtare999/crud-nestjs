import { Post, Get, Param, Body } from '@nestjs/common';
import { BaseService } from './base.service';
import { FetchRequestDto } from './dto/base-filter-dto';

export abstract class BaseController<T, S extends BaseService<T>> {
  constructor(protected readonly service: S) {}

  @Post('all')
  findAll(@Body() fetchDto: FetchRequestDto<T>): Promise<T[]> {
    console.log('filterDto', fetchDto);

    return this.service.findAll(fetchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<T> {
    return this.service.findOne(id);
  }
}
