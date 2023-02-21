import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty({ example: '1', description: 'current page' })
  page: number;

  @ApiProperty({ example: '15', description: 'limit on posts per page' })
  limit: number;
}
