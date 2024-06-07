import { IsEmail, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from 'src/common/dto/find.dto';
import { EntityTransactionTypeEnum } from 'src/common/enums/entity-transaction-type.enum';

export class FindTransactionDto extends FindDto {
	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by full name' })
	churchId?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by full name' })
	name?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by full name' })
	reason_for?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by full name' })
	staffId?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by full name' })
	amount?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by full name' })
	date?: string;

	@IsEnum(EntityTransactionTypeEnum)
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by transaction type' })
	transaction_type?: EntityTransactionTypeEnum;




}
