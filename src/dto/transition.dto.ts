import { Bank } from 'src/entity/bank.entity';

export class TransitionDto {
  readonly amount: number;
  readonly data: string;
  readonly bank: Bank;
  readonly type: string;
  categories: any[];
}
