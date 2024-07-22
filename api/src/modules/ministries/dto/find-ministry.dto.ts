import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from 'src/common/dto/find.dto';

export class FindMinistryDto extends FindDto {

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	churchId?: string;


	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	name?: string;
}