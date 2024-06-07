import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAccountDto {

  @ApiProperty()
  @IsString()
  churchId: string;

  @ApiProperty()
  @IsString()
  balance: string;

}
