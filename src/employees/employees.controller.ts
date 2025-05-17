import { Controller } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { BaseController } from 'src/base/base.controller';
import { Employee } from './entities/employee.entity';

@Controller('employees')
export class EmployeesController extends BaseController<
  Employee,
  EmployeesService
> {
  constructor(private readonly employeesService: EmployeesService) {
    super(employeesService);
  }
}
