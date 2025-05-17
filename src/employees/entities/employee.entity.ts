import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'employees' })
export class Employee {
  @PrimaryGeneratedColumn()
  emp_id: number;

  @Column()
  emp_code: string;

  @Column()
  emp_name: string;

  @Column()
  emp_email: string;

  @Column({ default: 'active' })
  emp_status: string;

  @Column()
  emp_type: string;

  @Column()
  emp_join_date: Date;
}
