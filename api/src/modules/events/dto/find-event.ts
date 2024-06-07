import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from 'src/common/dto/find.dto';

export class FindEventsDto extends FindDto {
	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly name?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly category?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly message?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly event_date?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly image?: string;



}
