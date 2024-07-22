import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMinistryDto {

	@IsNotEmpty()
	@ApiProperty()
	readonly churchId: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly name: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly description: string;

}