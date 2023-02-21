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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'src/dto/pagination.dto';
import { TransactionDto } from 'src/dto/transaction.dto';
import { Transaction } from 'src/entity/transaction.entity';
import { TransactionService } from './transaction.service';
@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @ApiOperation({ summary: 'Create transaction' })
  @ApiResponse({
    status: 200,
    type: Transaction,
  })
  @Post()
  create(@Body() transactionDto: TransactionDto): Promise<Transaction> {
    return this.transactionService.createTransaction(transactionDto);
  }

  @ApiOperation({ summary: 'Get transactions' })
  @ApiResponse({
    status: 200,
    type: [Transaction],
  })
  @Get()
  getAll(@Query() dto: Pagination): Promise<Transaction[]> {
    return this.transactionService.getAll(dto);
  }

  @ApiOperation({ summary: 'Delete transaction' })
  @ApiResponse({
    status: 200,
    type: Transaction,
  })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.transactionService.delTransaction(id);
  }
}
