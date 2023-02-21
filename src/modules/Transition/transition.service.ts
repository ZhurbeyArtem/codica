import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/dto/pagination.dto';
import { TransitionDto } from 'src/dto/transition.dto';
import { Transition } from 'src/entity/transition.entity';
import { Repository } from 'typeorm';
import { BankService } from '../bank/bank.service';
import { CategoryService } from '../category/category.service';
import { transactionInterface } from './transition.interface';

@Injectable()
export class TransitionService {
  constructor(
    @InjectRepository(Transition)
    private transitionRepository: Repository<Transition>,

    @Inject(CategoryService)
    private readonly categoryService: CategoryService,

    @Inject(BankService)
    private readonly bankService: BankService,
  ) {}

  async getAll(dto: Pagination): Promise<transactionInterface> {
    try {
      const page: number = dto.page || 1;
      const limit: number = dto.limit || 10;
      const offset: number = page * limit - limit;

      const transaction = await this.transitionRepository
        .createQueryBuilder('transition')
        .leftJoinAndSelect('transition.categories', 'categories')
        .leftJoinAndSelect('transition.bank', 'bank')
        .take(limit)
        .skip(offset)
        .getManyAndCount();
      return {
        transactions: transaction[0],
        count: transaction[1],
      };
    } catch (e) {
      console.log(e.message);
    }
  }

  async createTransition(dto: TransitionDto): Promise<Transition> {
    try {
      dto.categories = await this.categoryService.getCategoryIds(
        dto.categories,
      );

      const transition = await this.transitionRepository.save(dto);

      await this.bankService.changeBalance(
        { type: transition.type, amount: transition.amount },
        Number(transition.bank),
      );

      return transition;
    } catch (e) {
      return e.message;
    }
  }

  async delTransition(id: number): Promise<string> {
    try {
      const transaction = await this.transitionRepository
        .createQueryBuilder('transition')
        .leftJoinAndSelect('transition.bank', 'bank')
        .where('transition.id = :id', { id: id })
        .getOne();

      await this.bankService.changeBalance(
        { type: transaction.type, amount: transaction.amount },
        transaction.bank.id,
      );

      await this.transitionRepository
        .createQueryBuilder('transition')
        .delete()
        .from(Transition)
        .where('id = :id', { id: id })
        .execute();

      return 'Transaction deletion completed successfully';
    } catch (e) {
      console.log('+');
      console.log(e.message);
      return e;
    }
  }

  async getBy(id: number, model: string) {
    const test = await this.transitionRepository
      .createQueryBuilder('transition')
      .leftJoinAndSelect(`transition.${model}`, `${model}`)
      .where(`transition.${model}.id = :id`, { id: id })
      .getOne();

    console.log(test);
  }
}
