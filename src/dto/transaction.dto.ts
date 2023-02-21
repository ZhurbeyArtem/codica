import { ApiProperty } from '@nestjs/swagger';
import { Bank } from 'src/entity/bank.entity';

export class TransactionDto {
  @ApiProperty({ example: '1200', description: 'amount' })
  readonly amount: number;
  @ApiProperty({ example: '1', description: 'bank id' })
  readonly bank: Bank;
  @ApiProperty({ example: 'profitable || consumable', description: 'type' })
  readonly type: string;
  @ApiProperty({ example: '[1,2,3] || [1]', description: 'categories' })
  categories: any[];
}
