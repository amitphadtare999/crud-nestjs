import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'timesheet_periods' })
export class Period {
  @PrimaryGeneratedColumn()
  period_id: number;

  @Column({ name: 'period_week' })
  week: string;

  @Column({ name: 'period_week_end_date' })
  end_on: Date;
}
