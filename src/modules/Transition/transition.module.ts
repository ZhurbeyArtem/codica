import { Module } from '@nestjs/common';
import { TransitionService } from './transition.service';
import { TransitionController } from './transition.controller';
import { Transition } from '../../entity/transition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '../category/category.service';
import { Category } from 'src/entity/category.entity';
import { Bank } from 'src/entity/bank.entity';
import { BankService } from '../bank/bank.service';

@Module({
  providers: [TransitionService, CategoryService, BankService],
  controllers: [TransitionController],
  imports: [TypeOrmModule.forFeature([Transition, Category, Bank])],
})
export class TransitionModule {}
