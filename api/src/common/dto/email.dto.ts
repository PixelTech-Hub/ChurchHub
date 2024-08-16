import {
	IsDefined,
	IsEmail,
	IsNotEmpty
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailDto {
	@IsEmail()
	@IsDefined()
	@IsNotEmpty()
	@ApiProperty()
	readonly email: string;
}
