import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @IsString()
  @IsDefined()
  @MinLength(6)
  @MaxLength(50)
  @ApiProperty()
  readonly newPassword: string;

  @IsString()
  @IsDefined()
  @MinLength(6)
  @MaxLength(50)
  @ApiProperty()
  readonly currentPassword: string;
}
