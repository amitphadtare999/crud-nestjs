import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { Employee } from './employees/entities/employee.entity';
import { PeriodsModule } from './periods/periods.module';
import { Period } from './periods/entities/period.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'timesheet',
      entities: [Employee, Period],
      synchronize: false,
      logging: true,
    }),
    EmployeesModule,
    PeriodsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
