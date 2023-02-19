import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty({ example: 'Bob', description: 'First name' })
  page: number;

  @ApiProperty({ example: 'Bob', description: 'First name' })
  limit: number;
}
