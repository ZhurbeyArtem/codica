import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  ManyToOne,
  JoinTable,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Bank } from './bank.entity';
import { Category } from './category.entity';

@Entity()
export class Transition extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: '1200$', description: 'amount' })
  @Column()
  amount: number;

  @ApiProperty({ example: 'profitable || consumable', description: 'type' })
  @Column({
    type: 'enum',
    enum: ['profitable', 'consumable'],
  })
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Category, (category) => category.transitions, {
    cascade: true,
  })
  @JoinTable({
    name: 'transaction_category',
  })
  categories: Category[];

  @ManyToOne(() => Bank, (bank) => bank.transitions, {
    nullable: false,
    createForeignKeyConstraints: false,
  })
  bank: Bank;
}
