import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transactions.entity';
import { TransactionsController } from './controllers/transactions.controller';
import { TransactionService } from './services/transaction.service';

@Module({
	imports: [TypeOrmModule.forFeature([TransactionEntity])],
	controllers: [TransactionsController],
	providers: [TransactionService,],
	exports: [TransactionService], // 
})
export class TransactionsModule { }
