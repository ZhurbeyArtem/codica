import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from '../../entity/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '../Category/category.service';
import { Category } from 'src/entity/category.entity';
import { Bank } from 'src/entity/bank.entity';
import { BankService } from '../Bank/bank.service';

@Module({
  providers: [TransactionService, CategoryService, BankService],
  controllers: [TransactionController],
  imports: [TypeOrmModule.forFeature([Transaction, Category, Bank])],
})
export class TransactionModule {}
