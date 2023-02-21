import { ApiProperty } from '@nestjs/swagger';

export class BankDto {
  @ApiProperty({ example: 'monobank', description: 'bank name' })
  readonly name: string;
}

export class UpdateBankDto {
  @ApiProperty({ example: 'monobank', description: 'bank name' })
  readonly name: string;
  @ApiProperty({ example: '1250', description: 'balance count' })
  readonly balance: number;
}

export class ChangeBalanceDto {
  @ApiProperty({ example: 'consumable', description: 'type operation' })
  readonly type: string;
  @ApiProperty({ example: '1111', description: 'amount' })
  readonly amount: number;
}
