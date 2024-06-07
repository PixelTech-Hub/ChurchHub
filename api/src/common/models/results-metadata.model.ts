import { ApiProperty } from '@nestjs/swagger';

export class ResultsMetadata {
  @ApiProperty()
  count: number;

  @ApiProperty()
  offset: number;

  @ApiProperty()
  limit: number;
}