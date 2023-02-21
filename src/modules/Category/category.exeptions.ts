import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoryNotFoundException extends HttpException {
  constructor() {
    super('Category Not Found', HttpStatus.NOT_FOUND);
  }
}
export class CategoryFoundNameException extends HttpException {
  constructor() {
    super('Category with same name already exist', HttpStatus.BAD_REQUEST);
  }
}

export class CategoryTransitionException extends HttpException {
  constructor() {
    super('This category have some transaction', HttpStatus.BAD_REQUEST);
  }
}
