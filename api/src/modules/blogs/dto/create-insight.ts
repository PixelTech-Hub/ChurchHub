import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { EntityEventTypeEnum } from 'src/common/enums/entity-event-type.enum';

export class CreateInsightDto {
	@ApiProperty()
	@IsString()
	churchId: string;

	@ApiProperty()
	@IsString()
	name: string;


	@ApiProperty({})
	@IsString({ each: true })
	ministryId: string;

	@ApiProperty()
	@IsEnum(EntityEventTypeEnum)
	@IsNotEmpty()
	event_type: EntityEventTypeEnum;

	@ApiProperty()
	@IsString()
	message: string;

	@ApiProperty()
	@IsString()
	date: string;

	@ApiProperty()
	@IsString()
	image: string;


}

