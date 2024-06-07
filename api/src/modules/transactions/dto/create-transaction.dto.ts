import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EntityTransactionTypeEnum } from 'src/common/enums/entity-transaction-type.enum';

export class CreateTransactionDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	churchId: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	reason_for: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	staffId?: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	amount: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	date: string;

	@ApiProperty()
	@IsEnum(EntityTransactionTypeEnum)
	@IsNotEmpty()
	transaction_type: EntityTransactionTypeEnum;

}
