import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from 'src/common/dto/find.dto';

export class FindSermonDto extends FindDto {
	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly name?: string;



	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly pastor?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly link?: string;
}
