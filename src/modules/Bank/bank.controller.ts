import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BankDto, UpdateBankDto } from 'src/dto/bank.dto';
import { Bank } from 'src/entity/bank.entity';
import { BankService } from './bank.service';

@ApiTags('Bank')
@Controller('bank')
export class BankController {
  constructor(private bankService: BankService) {}

  @ApiOperation({ summary: 'Create new bank' })
  @ApiResponse({ status: 200, type: Bank })
  @Post()
  create(@Body() bankDto: BankDto): Promise<Bank> {
    return this.bankService.createBank(bankDto);
  }

  @ApiOperation({ summary: 'Get all banks' })
  @ApiResponse({ status: 200, type: [Bank] })
  @Get()
  getAll(): Promise<Bank[]> {
    return this.bankService.getAll();
  }

  @ApiOperation({ summary: 'Get by id bank' })
  @ApiResponse({ status: 200, type: Bank })
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Bank> {
    return this.bankService.getById(id);
  }

  @ApiOperation({ summary: 'Delete bank' })
  @ApiResponse({ status: 200, type: 'Bank deleted' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.bankService.delBank(id);
  }

  @ApiOperation({ summary: 'Update bank' })
  @ApiResponse({ status: 200, type: Bank })
  @Put(':id')
  updateBank(
    @Param('id', ParseIntPipe) id: number,
    @Body() bankDto: UpdateBankDto,
  ): Promise<Bank> {
    return this.bankService.updateBank(bankDto, id);
  }
}
