import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from './transaction.entity';

@Entity()
export class Category extends BaseEntity {
  @ApiProperty({ example: '1', description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'own business', description: 'name of category' })
  @Column()
  name: string;

  @ManyToMany(() => Transaction, (transition) => transition.categories)
  transitions: Transaction[];
}
