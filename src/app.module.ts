import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankModule } from './modules/bank/bank.module';
import { CategoryModule } from './modules/category/category.module';
import { StatisticModule } from './modules/Statistic/statistic.module';
import { TransactionModule } from './modules/Transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    BankModule,
    CategoryModule,
    TransactionModule,
    StatisticModule,
  ],
  providers: [],
})
export class AppModule {}
