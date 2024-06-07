import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { TransactionEntity } from '../entities/transactions.entity';
import { AccountEntity } from 'src/modules/account/entities/account.entity';
import { EntityTransactionTypeEnum } from 'src/common/enums/entity-transaction-type.enum';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@Injectable()
export class TransactionService {
	constructor(
		@InjectRepository(TransactionEntity)
		private readonly transactionRepository: Repository<TransactionEntity>,
		@InjectRepository(AccountEntity)
		private readonly accountRepository: Repository<AccountEntity>,
	) { }




	async createTransaction(createTransactionDto: CreateTransactionDto): Promise<TransactionEntity> {
		// Extract necessary data from transactionData
		const { churchId, amount, date, name, reason_for, staffId, transaction_type } = createTransactionDto;

		// Find the account associated with the churchId
		const account = await this.accountRepository.findOne({ where: { churchId } });

		// Throw an error if account is not found
		if (!account) {
			throw new NotFoundException(`Account not found for church with ID: ${churchId}`);
		}
		// Check for withdrawal transaction and validate balance
		if (transaction_type === EntityTransactionTypeEnum.withdrawal) {
			const currentBalance = parseFloat(account.balance);
			const withdrawalAmount = parseFloat(amount);

			// Check if there are sufficient funds for withdrawal
			if (currentBalance < withdrawalAmount) {
				throw new Error('Insufficient funds in your account');
			}
		}

		// Update the account balance based on the transaction type
		switch (transaction_type) {
			case EntityTransactionTypeEnum.deposit:
				account.balance = (parseFloat(account.balance) + parseFloat(amount)).toString();
				break;
			case EntityTransactionTypeEnum.withdrawal:
				account.balance = (parseFloat(account.balance) - parseFloat(amount)).toString();
				break;
			default:
				throw new Error('Invalid transaction type');
		}

		// Save the updated account
		await this.accountRepository.save(account);

		// Create and save the transaction entity
		const transaction = this.transactionRepository.create(createTransactionDto);
		return await this.transactionRepository.save(transaction);
	}
	async findAll(): Promise<TransactionEntity[]> {
		return this.transactionRepository.find({
			relations: ['staff', 'church'],
			order: {
				createdAt: "DESC"
			}
		});
	}
	async findOne(id: string): Promise<TransactionEntity> {
		const churchMember = await this.transactionRepository.findOne({ where: { id }, relations: ['staff', 'church'] });
		if (!churchMember) {
			throw new NotFoundException('Church member not found');
		}
		return churchMember;
	}
}