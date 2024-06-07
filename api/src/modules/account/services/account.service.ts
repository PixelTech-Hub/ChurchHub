import { BaseService } from "src/common/services/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { FindAccountDto } from "../dto/find-account";
import { AccountEntity } from "../entities/account.entity";
import { CreateAccountDto } from "../dto/create-account";
import { NotFoundException } from "@nestjs/common";


export class AccountService extends BaseService<
	AccountEntity,
	FindAccountDto,
	CreateAccountDto
> {
	constructor(
		@InjectRepository(AccountEntity)
		private readonly accountRepository: Repository<AccountEntity>,
	) {
		super(accountRepository, AccountService.dtoToFindOptionsWhere, []);
	}

	static dtoToFindOptionsWhere(
		dto: FindAccountDto = {} as FindAccountDto,
	): FindOptionsWhere<AccountEntity> {
		const where: FindOptionsWhere<AccountEntity> = {};
		if (dto.balance) where.balance = dto.balance;
		if (dto.churchId) where.churchId = dto.churchId;
		// Ensure that 'limit', 'skip', and other pagination properties are not included in the query options
		delete dto.limit;

		// You might also want to handle other properties specific to your application

		return Object.keys(where).length ? where : null; // Return null if no filtering criteria are provided
	}
	async findAllAcounts(dto: FindAccountDto): Promise<AccountEntity[]> {
		return this.accountRepository.find({ relations: ['church'] });
	}

	async findOneAccount(id: string): Promise<AccountEntity> {
		const account = await this.accountRepository.findOne({ where: { id }, relations: ['church'] });
		if (!account) {
			throw new NotFoundException('Church Account not found');
		}
		return account;
	}
}