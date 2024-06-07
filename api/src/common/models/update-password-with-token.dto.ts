import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordWithTokenDto {
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

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  passwordUpdateToken: string;
}
