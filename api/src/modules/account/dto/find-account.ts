import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from 'src/common/dto/find.dto';

export class FindAccountDto extends FindDto {
	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly churchId?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly balance?: string;
}
