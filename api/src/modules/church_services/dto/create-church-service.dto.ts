import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateChurchServiceDto {

	@IsNotEmpty()
	@ApiProperty()
	readonly name: string;


	@IsNotEmpty()
	@ApiProperty()
	readonly churchId: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly start_time: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly end_time: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly language: string;

}