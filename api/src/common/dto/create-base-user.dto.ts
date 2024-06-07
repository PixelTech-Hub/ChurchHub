import {
	IsBoolean,
	IsDefined,
	IsEmail,
	IsNotEmpty,
	IsPhoneNumber,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBaseUserDto {
	@IsString()
	@IsDefined()
	@IsNotEmpty()
	@ApiProperty()
	readonly name: string;

	@IsEmail()
	@IsDefined()
	@IsNotEmpty()
	@ApiProperty()
	readonly email: string;

	@IsString()
	@IsDefined()
	@MinLength(6)
	@MaxLength(50)
	@ApiProperty()
	readonly password: string;

	@ApiProperty()
	@IsPhoneNumber()
	phone_number: string

	@ApiProperty()
	@IsPhoneNumber()
	photo: string

	@ApiProperty()
	@IsPhoneNumber()
	profession: string


	@ApiProperty()
	@IsString()
	address: string

	@ApiProperty()
	@IsString()
	city: string

	@ApiProperty()
	@IsString()
	@MinLength(100)
	@MaxLength(250)
	about: string

}
