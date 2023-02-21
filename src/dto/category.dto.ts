import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({ example: 'food', description: 'category name' })
  readonly name: string;
}
