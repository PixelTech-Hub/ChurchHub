import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateChurchDto {

	@IsNotEmpty()
	@ApiProperty()
	readonly name: string;

	@IsNotEmpty()
	@IsEmail()
	@ApiProperty()
	readonly email: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly website: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly office_no: string;

	@IsOptional()
	@ApiProperty()
	readonly vision?: string;

	@IsOptional()
	@ApiProperty()
	readonly mission?: string;

	@IsOptional()
	@ApiProperty()
	readonly core_values?: string;

	@IsNotEmpty()
	@ApiProperty({ default: true })
	readonly isEnabled: boolean;



}