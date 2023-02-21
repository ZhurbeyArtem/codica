import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import { Transaction } from 'src/entity/transaction.entity';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

@Module({
  providers: [StatisticService],
  controllers: [StatisticController],
  imports: [TypeOrmModule.forFeature([Category, Transaction])],
})
export class StatisticModule {}
