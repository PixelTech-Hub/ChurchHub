import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from 'src/common/dto/find.dto';

export class FindChurchDto extends FindDto {
	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	email?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	office_no?: string;
	
	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	website?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	name?: string;
}