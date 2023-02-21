import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from 'src/entity/bank.entity';
import { Transaction } from 'src/entity/transaction.entity';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';

@Module({
  controllers: [BankController],
  providers: [BankService],
  imports: [TypeOrmModule.forFeature([Bank, Transaction])],
})
export class BankModule {}
