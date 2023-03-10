import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from 'src/dto/category.dto';
import { Category } from 'src/entity/category.entity';
import { Transaction } from 'src/entity/transaction.entity';
import {
  FoundNameException,
  TransactionException,
} from 'src/exeptions/global.exeptions';
import { In, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async getById(id: number): Promise<Category> {
    try {
      const category = await this.categoryRepository
        .createQueryBuilder('category')
        .where('category.id = :id', { id: id })
        .select(['name'])
        .getRawOne();

      if (!category) throw new Error();

      return category;
    } catch (e) {
      throw new NotFoundException('Category');
    }
  }

  async getAll(): Promise<Category[]> {
    try {
      const category = await this.categoryRepository.find();
      return category;
    } catch (e) {
      console.log(e);
    }
  }

  async getCategoryByName(name: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { name },
      });
      return category;
    } catch (e) {
      return e;
    }
  }

  async getCategoryIds(ids: number[]): Promise<Category[]> {
    try {
      return await this.categoryRepository.find({ where: { id: In(ids) } });
    } catch (e) {
      throw new NotFoundException('Category');
    }
  }

  async createCategory(dto: CategoryDto): Promise<Category> {
    try {
      const futureCategory = await this.categoryRepository.findOne({
        where: { name: dto.name },
      });

      if (futureCategory) throw new Error();

      const category = await this.categoryRepository.save(dto);
      return category;
    } catch (e) {
      throw new FoundNameException('Category');
    }
  }

  async delCategory(id: number): Promise<string> {
    try {
      await this.getById(id);

      await this.getBy(id);

      await this.categoryRepository
        .createQueryBuilder('category')
        .delete()
        .from(Category)
        .where('id = :id', { id: id })
        .execute();

      return 'Category deletion completed successfully';
    } catch (e) {
      throw e;
    }
  }

  async getBy(id: number) {
    try {
      const transaction = await this.transactionRepository
        .createQueryBuilder('transaction')
        .leftJoinAndSelect(`transaction.category`, `category`)
        .where(`transaction.category.id = :id`, { id: id })
        .getOne();

      if (transaction) throw new Error();
    } catch (e) {
      throw new TransactionException('category');
    }
  }

  async updateCategory(dto: CategoryDto, id: number): Promise<Category> {
    try {
      await this.getById(id);

      const checkName = await this.categoryRepository.findOne({
        where: { name: dto.name },
      });

      if (checkName) throw new Error();

      const category = await this.categoryRepository
        .createQueryBuilder('category')
        .update(Category)
        .set(dto)
        .where('id = :id', { id: id })
        .returning(['name'])
        .execute();

      return category.raw;
    } catch (e) {
      throw new FoundNameException('Category');
    }
  }
}
