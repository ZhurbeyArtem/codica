import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Transition } from './transition.entity';

@Entity()
export class Bank extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'monobank', description: 'bank name' })
  @Column({ type: 'varchar', width: 40, unique: true })
  name: string;

  @ApiProperty({ example: '1300$', description: 'balance' })
  @Column({
    default: 0,
  })
  balance: number;

  @OneToMany(() => Transition, (transition) => transition.bank)
  transitions: Transition[];
}
