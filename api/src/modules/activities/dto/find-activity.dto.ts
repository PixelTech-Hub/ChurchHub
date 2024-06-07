import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from 'src/common/dto/find.dto';

export class FindActivityDto extends FindDto {
	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	mainChurchId?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	churchBranchId?: string;


	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	name?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	description?: string;
}