import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from 'src/common/dto/find.dto';

export class FindContactDto extends FindDto {
	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly name?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly email?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly telephone?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly subject?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly message?: string;
}
