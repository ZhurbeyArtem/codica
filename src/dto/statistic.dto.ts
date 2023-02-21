import { ApiProperty } from '@nestjs/swagger';

export class statisticDto {
  @ApiProperty({ example: '[1,2]', description: 'categories id' })
  categoryIds: number[];
  @ApiProperty({ example: '2023-02-21', description: 'from period' })
  fromPeriod: string;
  @ApiProperty({ example: '2023-02-23', description: 'to period' })
  toPeriod: string;
}
