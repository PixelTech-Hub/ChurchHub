import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEventDto {
	@ApiProperty()
	@IsString()
	churcId: string;

	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	category: string;

	@ApiProperty()
	@IsString()
	message: string;

	@ApiProperty()
	@IsString()
	event_date: string;

	@ApiProperty()
	@IsString()
	image: string;
}

