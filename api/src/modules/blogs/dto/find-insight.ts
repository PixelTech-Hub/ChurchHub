import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from 'src/common/dto/find.dto';

export class FindInsightsDto extends FindDto {
	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly churchId?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly name?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly ministryId?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly event_type?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly message?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly date?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly image?: string;

	



}
