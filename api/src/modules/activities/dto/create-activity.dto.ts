import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDto {

	@IsNotEmpty()
	@ApiProperty()
	readonly churchId: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	readonly churchBranchId: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly name: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly description: string;

}