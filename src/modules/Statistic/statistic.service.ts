import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { statisticDto } from 'src/dto/statistic.dto';
import { Category } from 'src/entity/category.entity';
import { Transaction } from 'src/entity/transaction.entity';
import { In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { IStatistic } from './statistic.inerface';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async getStat(dto: statisticDto): Promise<IStatistic[]> {
    try {
      const arr = [];
      const categories = await this.categoryRepository.find({
        where: { id: In(dto.categoryIds) },
      });
      for (let i = 0; i < categories.length; i++) {
        const transactions = await this.transactionRepository
          .createQueryBuilder('transaction')
          .leftJoinAndSelect('transaction.categories', 'categories')
          .where('categories.id = :categories', {
            categories: categories[i].id,
          })
          .andWhere({
            createdAt: LessThanOrEqual(dto.toPeriod),
          })
          .andWhere({
            createdAt: MoreThanOrEqual(dto.fromPeriod),
          })
          .getMany();
        const result = transactions.reduce(
          (a, b) => (b.type === 'profitable' ? a + b.amount : a - b.amount),
          0,
        );

        arr.push({ category: categories[i].name, balance: result });
      }
      return arr;
    } catch (e) {
      return e.message;
    }
  }
}
