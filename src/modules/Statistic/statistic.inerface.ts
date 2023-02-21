import { ApiProperty } from '@nestjs/swagger';

export class IStatistic {
  @ApiProperty({ example: 'food', description: 'category' })
  category: string;
  @ApiProperty({
    example: '1200',
    description: 'money you lost on this category',
  })
  balance: number;
} 
