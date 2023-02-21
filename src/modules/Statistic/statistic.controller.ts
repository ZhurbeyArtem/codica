import { Body, Controller, Get } from '@nestjs/common';
import { statisticDto } from 'src/dto/statistic.dto';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
  constructor(private statisticService: StatisticService) {}

  @Get()
  getStat(@Body() dto: statisticDto) {
    return this.statisticService.getStat(dto);
  }
}
