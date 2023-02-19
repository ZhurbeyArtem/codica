import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Transition } from './transition.entity';

@Entity()
export class Category extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'own business', description: 'name of category' })
  @Column()
  name: string;

  @ManyToMany(() => Transition, (transition) => transition.categories)
  transitions: Transition[];
}
