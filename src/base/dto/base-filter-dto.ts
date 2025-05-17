export interface FilterCriteria<T> {
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

export interface FetchRequestDto<T> {
  filter?: FilterCriteria<T>[];
  orderBy?: { field: keyof T; order: 'ASC' | 'DESC' };
  page?: number;
  limit?: number;
}
