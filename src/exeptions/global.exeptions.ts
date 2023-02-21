import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(type) {
    super(`${type} Not Found`, HttpStatus.NOT_FOUND);
  }
}

export class FoundNameException extends HttpException {
  constructor(type) {
    super(`${type} with same name already exist`, HttpStatus.BAD_REQUEST);
  }
}

export class TransactionException extends HttpException {
  constructor(type) {
    super(`This ${type} have some transaction`, HttpStatus.BAD_REQUEST);
  }
}
