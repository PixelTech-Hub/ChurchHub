import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from 'src/common/dto/find.dto';

export class FindSystemAdminDto extends FindDto {
	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	email?: string;
	
	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	name?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	searchQuery?: string;
}