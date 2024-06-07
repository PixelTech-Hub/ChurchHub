import { ApiProperty } from '@nestjs/swagger';

export class Email {
  @ApiProperty()
  readonly email: String;
}