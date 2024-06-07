import {
	IsDefined,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
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

}
