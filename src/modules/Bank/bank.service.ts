import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankDto, ChangeBalanceDto, UpdateBankDto } from 'src/dto/bank.dto';
import { Bank } from 'src/entity/bank.entity';
import { Repository } from 'typeorm';
import {
  BankFoundNameException,
  BankMoneyException,
  BankNotFoundException,
} from './bank.exeptions';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,
  ) {}

  async getById(id: number): Promise<Bank> {
    try {
      const bank = await this.bankRepository
        .createQueryBuilder('bank')
        .where('bank.id = :id', { id: id })
        .select(['name', 'balance'])
        .getRawOne();

      if (!bank) throw new Error();

      return bank;
    } catch (e) {
      throw new BankNotFoundException();
    }
  }

  async getAll(): Promise<Bank[]> {
    try {
      const bank = await this.bankRepository.find();
      return bank;
    } catch (e) {
      console.log(e);
    }
  }

  async createBank(dto: BankDto): Promise<Bank> {
    try {
      const futureBank = await this.bankRepository.findOne({
        where: { name: dto.name },
      });

      if (futureBank) throw new Error();

      const bank = await this.bankRepository.save(dto);
      return bank;
    } catch (e) {
      throw new BankFoundNameException();
    }
  }

  async delBank(id: number): Promise<string> {
    try {
      await this.getById(id);

      await this.bankRepository
        .createQueryBuilder('bank')
        .delete()
        .from(Bank)
        .where('id = :id', { id: id })
        .execute();

      return 'Bank deletion completed successfully';
    } catch (e) {
      throw new BankNotFoundException();
    }
  }

  async updateBank(dto: UpdateBankDto, id: number): Promise<Bank> {
    try {
      await this.getById(id);

      const checkName = await this.bankRepository.findOne({
        where: { name: dto.name },
      });

      if (checkName) throw new Error();

      const bank = await this.bankRepository
        .createQueryBuilder('bank')
        .update(Bank)
        .set(dto)
        .where('id = :id', { id: id })
        .returning(['name', 'balance'])
        .execute();

      return bank.raw;
    } catch (e) {
      throw new BankFoundNameException();
    }
  }

  async changeBalance(dto: ChangeBalanceDto, id: number) {
    try {
      const bank = await this.getById(id);

      dto.type === 'profitable'
        ? (bank.balance += dto.amount)
        : (bank.balance -= dto.amount);

      if (bank.balance < 0) throw new Error();

      const newBank = await this.bankRepository
        .createQueryBuilder('bank')
        .update(Bank)
        .set(bank)
        .where('id = :id', { id: id })
        .returning(['name', 'balance'])
        .execute();

      return newBank.raw;
    } catch (e) {
      return new BankMoneyException();
    }
  }
}
