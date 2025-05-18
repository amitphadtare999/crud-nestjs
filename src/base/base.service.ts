import { BadRequestException, Injectable } from '@nestjs/common';
import {
  Between,
  EntityPropertyNotFoundError,
  Equal,
  FindManyOptions,
  FindOperator,
  FindOptionsOrder,
  FindOptionsWhere,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import {
  FetchRequestDto,
  IFetchRequestDto,
  IFilterCriteria,
} from './dto/base-filter-dto';

export function mapOperatorToTypeOrmOperator<T>(
  operator: IFilterCriteria<T>['operator'],
  value: any,
): FindOperator<any> | any {
  switch (operator) {
    case 'equal':
      return Equal(value);
    case 'notEqual':
      return Not(Equal(value));
    case 'greaterThan':
      return MoreThan(value);
    case 'lessThan':
      return LessThan(value);
    case 'greaterThanOrEqual':
      return MoreThanOrEqual(value);
    case 'lessThanOrEqual':
      return LessThanOrEqual(value);
    case 'like':
      if (typeof value !== 'string') {
        throw new Error('Value for "like" operator must be a string');
      }
      return Like(`%${value}%`);
    case 'in':
      if (!Array.isArray(value))
        throw new Error('Value for "in" operator must be an array');
      return In(value);
    case 'notIn':
      if (!Array.isArray(value))
        throw new Error('Value for "in" operator must be an array');
      return Not(In(value));
    case 'between':
      if (!Array.isArray(value) || value.length !== 2)
        throw new Error('Value for "in" operator must be an array');
      return Between(value[0], value[1]);
    case 'isNull':
      return IsNull();
    case 'isNotNull':
      return Not(IsNull());
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

@Injectable()
export abstract class BaseService<T> {
  protected primaryKey: keyof T;

  constructor(
    protected readonly repo: Repository<T>,
    primaryKey: keyof T,
  ) {
    this.primaryKey = primaryKey;
  }

  async findAll(fetchRequestDto?: FetchRequestDto): Promise<T[]> {
    const { filter, orderBy, limit = 10000, page = 1 } = fetchRequestDto;

    const findOptions: FindManyOptions<T> = {};
    const where: FindOptionsWhere<T> = {};

    filter?.forEach((item) => {
      const { name, value, operator } = item;

      try {
        const condition = mapOperatorToTypeOrmOperator<T>(operator, value);
        where[name] = condition;
      } catch (error) {
        throw error;
      }
    });
    findOptions.where = where;

    if (orderBy) {
      findOptions.order = {
        [orderBy.field]: orderBy.order,
      } as any as FindOptionsOrder<T>;
    }

    const skip = (page - 1) * limit;
    findOptions.skip = skip;
    findOptions.take = limit;

    try {
      return await this.repo.find(findOptions);
    } catch (error) {
      console.error('Error in findAll:', error);
      if (error instanceof EntityPropertyNotFoundError) {
        throw new BadRequestException('Invalid request payload');
      }
      throw new Error('Error fetching data');
    }
  }

  findOne(id: number): Promise<T | null> {
    return this.repo.findOneBy({ [this.primaryKey]: id } as any);
  }
}
