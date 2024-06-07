import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBranchDto {

	@IsNotEmpty()
	@ApiProperty()
	readonly name: string;

	@IsNotEmpty()
	@IsEmail()
	@ApiProperty()
	readonly email: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly mainChurchId: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly dob: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly church_number: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly location: string;


}