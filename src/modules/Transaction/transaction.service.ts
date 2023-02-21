import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/dto/pagination.dto';
import { TransactionDto } from 'src/dto/transaction.dto';
import { Transaction } from 'src/entity/transaction.entity';
import { Repository } from 'typeorm';
import { BankService } from '../bank/bank.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,

    @Inject(CategoryService)
    private readonly categoryService: CategoryService,

    @Inject(BankService)
    private readonly bankService: BankService,
  ) {}

  async getAll(dto: Pagination): Promise<Transaction[]> {
    try {
      const page: number = dto.page || 1;
      const limit: number = dto.limit || 5;
      const offset: number = page * limit - limit;

      const transaction = await this.transactionRepository
        .createQueryBuilder('transaction')
        .leftJoinAndSelect('transaction.categories', 'categories')
        .leftJoinAndSelect('transaction.bank', 'bank')
        .take(limit)
        .skip(offset)
        .getMany();
      return transaction;
    } catch (e) {
      return e.message;
    }
  }

  async createTransaction(dto: TransactionDto): Promise<Transaction> {
    try {
      dto.categories = await this.categoryService.getCategoryIds(
        dto.categories,
      );

      const transaction = await this.transactionRepository.save(dto);

      await this.bankService.changeBalance(
        { type: transaction.type, amount: transaction.amount },
        Number(transaction.bank),
      );

      return transaction;
    } catch (e) {
      return e.message;
    }
  }

  async delTransaction(id: number): Promise<string> {
    try {
      const transaction = await this.transactionRepository
        .createQueryBuilder('transaction')
        .leftJoinAndSelect('transaction.bank', 'bank')
        .where('transaction.id = :id', { id: id })
        .getOne();

      await this.bankService.changeBalance(
        { type: transaction.type, amount: transaction.amount },
        transaction.bank.id,
      );

      await this.transactionRepository
        .createQueryBuilder('transaction')
        .delete()
        .from(Transaction)
        .where('id = :id', { id: id })
        .execute();

      return 'Transaction deletion completed successfully';
    } catch (e) {
      return e;
    }
  }
}
