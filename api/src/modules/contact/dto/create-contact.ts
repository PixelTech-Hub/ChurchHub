import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateContactDto {
	@ApiProperty()
	@IsString()
	churchId: string;

	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsString()
	telephone: string;

	@ApiProperty()
	@IsString()
	subject: string;

	@ApiProperty()
	@IsString()
	message: string;


}
