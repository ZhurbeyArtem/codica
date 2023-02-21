import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { statisticDto } from 'src/dto/statistic.dto';
import { Category } from 'src/entity/category.entity';
import { Transition } from 'src/entity/transition.entity';
import { And, In, LessThan, MoreThan, Repository } from 'typeorm';
import { IStatistic } from './statistic.inerface';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Transition)
    private transitionRepository: Repository<Transition>,
  ) {}
  // : Promise<IStatistic[]>
  async getStat(dto: statisticDto) {
    const arr = [];
    const categories = await this.categoryRepository.find({
      where: { id: In(dto.categoryIds) },
    });
    for (let i = 0; i < categories.length; i++) {
      const transactions = await this.transitionRepository
        .createQueryBuilder('transition')
        .leftJoinAndSelect('transition.categories', 'categories')
        .where('categories.id = :categories', {
          categories: categories[i].id,
        })
        .andWhere({
          createdAt: LessThan(dto.toPeriod),
        })
        .andWhere({
          createdAt: MoreThan(dto.fromPeriod),
        })
        .getMany();
      // додати розрахунок в залежності від типу операціями
      console.log(transactions);
      const result = transactions.reduce((a, b) => a + b.amount, 0);

      arr.push({ category: categories[i].name, balance: result });
    }
    return arr;
  }
}
