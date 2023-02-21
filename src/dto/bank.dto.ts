export class BankDto {
  readonly name: string;
}

export class UpdateBankDto {
  readonly name: string;
  readonly balance: number;
}

export class ChangeBalanceDto {
  readonly type: string;
  readonly amount: number;
}
