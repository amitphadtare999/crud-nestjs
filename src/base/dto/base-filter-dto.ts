import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export interface IFilterCriteria<T> {
  name: keyof T;
  value: any;
  operator:
    | 'equal'
    | 'notEqual'
    | 'greaterThan'
    | 'lessThan'
    | 'greaterThanOrEqual'
    | 'lessThanOrEqual'
    | 'like'
    | 'in'
    | 'notIn'
    | 'between'
    | 'isNull'
    | 'isNotNull';
}

export interface IFetchRequestDto<T> {
  filter?: IFilterCriteria<T>[];
  orderBy?: { field: keyof T; order: 'ASC' | 'DESC' };
  page?: number;
  limit?: number;
}

export class FilterCriteriaDto implements IFilterCriteria<any> {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
  @IsEnum([
    'equal',
    'notEqual',
    'greaterThan',
    'lessThan',
    'greaterThanOrEqual',
    'lessThanOrEqual',
    'like',
    'in',
    'notIn',
    'between',
    'isNull',
    'isNotNull',
  ])
  operator: IFilterCriteria<any>['operator'];

  @IsDefined()
  value: any;
}

export class OrderByCriteria {
  @IsString()
  @IsDefined()
  field: string;

  @IsEnum(['ASC', 'DESC'])
  @IsDefined()
  order: 'ASC' | 'DESC';
}

export class FetchRequestDto implements IFetchRequestDto<any> {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterCriteriaDto)
  filter?: FilterCriteriaDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => OrderByCriteria)
  orderBy?: OrderByCriteria;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  limit?: number;
}
