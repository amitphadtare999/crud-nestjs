import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Period } from './entities/period.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { CreatePeriodDto } from './dto/create-period.dto';
// import { UpdatePeriodDto } from './dto/update-period.dto';

@Injectable()
export class PeriodsService extends BaseService<Period> {
  constructor(
    @InjectRepository(Period)
    protected repo: Repository<Period>,
  ) {
    super(repo, 'period_id');
  }
}
