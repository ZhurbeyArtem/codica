import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from './transaction.entity';

@Entity()
export class Bank extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Id' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'monobank', description: 'bank name' })
  @Column({ type: 'varchar', width: 40, unique: true })
  name: string;

  @ApiProperty({ example: '0', description: 'balance' })
  @Column({
    default: 0,
  })
  balance: number;

  @OneToMany(() => Transaction, (transition) => transition.bank)
  transitions: Transaction[];
}
