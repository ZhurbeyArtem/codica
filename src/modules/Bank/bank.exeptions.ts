import { HttpException, HttpStatus } from '@nestjs/common';

export class BankNotFoundException extends HttpException {
  constructor() {
    super('Bank Not Found', HttpStatus.NOT_FOUND);
  }
}

export class BankFoundNameException extends HttpException {
  constructor() {
    super('bank with same name already exist', HttpStatus.BAD_REQUEST);
  }
}

export class BankMoneyException extends HttpException {
  constructor() {
    super(
      "You don't have enough money in your account",
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class BankTransitionException extends HttpException {
  constructor() {
    super('This bank have some transaction', HttpStatus.BAD_REQUEST);
  }
}
