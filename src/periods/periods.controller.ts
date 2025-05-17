import { Controller } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { BaseController } from 'src/base/base.controller';
import { Period } from './entities/period.entity';
// import { CreatePeriodDto } from './dto/create-period.dto';
// import { UpdatePeriodDto } from './dto/update-period.dto';

@Controller('periods')
export class PeriodsController extends BaseController<Period, PeriodsService> {
  constructor(private readonly periodsService: PeriodsService) {
    super(periodsService);
  }

  // @Get()
  // findAll() {
  //   return this.periodsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.periodsService.findOne(+id);
  // }
}
