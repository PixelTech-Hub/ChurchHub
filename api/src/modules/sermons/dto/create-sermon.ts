import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSermonDto {
	@ApiProperty()
	@IsString()
	churchId: string;

	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	pastor: string;

	@ApiProperty()
	@IsString()
	link: string;
}
