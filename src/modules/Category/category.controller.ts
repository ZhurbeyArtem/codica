import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from 'src/dto/category.dto';
import { Category } from 'src/entity/category.entity';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create new category' })
  @ApiResponse({ status: 200, type: Category })
  @Post()
  create(@Body() categoryDto: CategoryDto) {
    return this.categoryService.createCategory(categoryDto);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @ApiOperation({ summary: 'Get category' })
  @ApiResponse({ status: 200, type: Category })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.getById(id);
  }

  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 200, type: 'success deleted' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.categoryService.delCategory(id);
  }

  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200, type: Category })
  @Put(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoryDto: CategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(categoryDto, id);
  }
}
