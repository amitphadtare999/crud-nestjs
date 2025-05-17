import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class EmployeesService extends BaseService<Employee> {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {
    super(employeeRepository, 'emp_id');
  }
}
