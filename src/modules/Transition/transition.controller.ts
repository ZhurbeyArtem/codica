import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Pagination } from 'src/dto/pagination.dto';
import { TransitionDto } from 'src/dto/transition.dto';
import { transactionInterface } from './transition.interface';
import { TransitionService } from './transition.service';

@Controller('transition')
export class TransitionController {
  constructor(private transitionService: TransitionService) {}

  @Post()
  create(@Body() transitionDto: TransitionDto) {
    return this.transitionService.createTransition(transitionDto);
  }

  @Get()
  getAll(@Query() dto: Pagination): Promise<transactionInterface> {
    return this.transitionService.getAll(dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.transitionService.delTransition(id);
  }
}
