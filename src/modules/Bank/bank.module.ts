import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from 'src/entity/bank.entity';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';

@Module({
  controllers: [BankController],
  providers: [BankService],
  imports: [TypeOrmModule.forFeature([Bank])],
})
export class BankModule {}
