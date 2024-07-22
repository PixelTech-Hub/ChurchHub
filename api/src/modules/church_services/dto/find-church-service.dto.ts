import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from 'src/common/dto/find.dto';

export class FindChurchServiceDto extends FindDto {
	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	name?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	churchId?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	language?: string;
}