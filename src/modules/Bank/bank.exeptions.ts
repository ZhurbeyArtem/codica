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
    super('The balance cannot be less than 0', HttpStatus.BAD_REQUEST);
  }
}