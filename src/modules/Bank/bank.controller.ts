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
import { BankDto, UpdateBankDto } from 'src/dto/bank.dto';
import { Bank } from 'src/entity/bank.entity';
import { BankService } from './bank.service';

@Controller('bank')
export class BankController {
  constructor(private bankService: BankService) {}

  @Post()
  create(@Body() bankDto: BankDto) {
    return this.bankService.createBank(bankDto);
  }

  @Get()
  getAll() {
    return this.bankService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Bank> {
    return this.bankService.getById(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.bankService.delBank(id);
  }

  @Put(':id')
  updateBank(
    @Param('id', ParseIntPipe) id: number,
    @Body() bankDto: UpdateBankDto,
  ): Promise<Bank> {
    return this.bankService.updateBank(bankDto, id);
  }
}
