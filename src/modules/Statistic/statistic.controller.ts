import { Body, Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { statisticDto } from 'src/dto/statistic.dto';
import { IStatistic } from './statistic.inerface';
import { StatisticService } from './statistic.service';
@ApiTags('Statistic')
@Controller('statistic')
export class StatisticController {
  constructor(private statisticService: StatisticService) {}

  @ApiOperation({ summary: 'Get statistic' })
  @ApiResponse({
    status: 200,
    type: IStatistic,
  })
  @Get()
  getStat(@Body() dto: statisticDto): Promise<IStatistic[]> {
    return this.statisticService.getStat(dto);
  }
}
