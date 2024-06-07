import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from 'src/common/dto/find.dto';

export class FindSubscriberDto extends FindDto {

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	readonly email?: string;
}
