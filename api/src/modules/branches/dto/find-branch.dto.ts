import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from 'src/common/dto/find.dto';

export class FindBranchDto extends FindDto {
	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	email?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	mainChurchId?: string;


	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	name?: string;
}