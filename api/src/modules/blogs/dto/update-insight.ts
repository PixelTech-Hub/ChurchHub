import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from 'src/common/dto/find.dto';

export class UpdateInsightsDto extends FindDto {
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
	readonly images?: string;


	@IsInt()
	@IsOptional()
	@ApiPropertyOptional()
	@Min(0)
	readonly likes: number;

}
