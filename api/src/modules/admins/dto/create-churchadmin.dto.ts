import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateBaseUserDto } from 'src/common/dto/create-base-user.dto';
import { EntityNameEnum } from 'src/common/enums/entity-name.enum';
import { EntityChurchAdminRoleEnum } from '../enums/admin.enum';

export class CreateChurchAdminDto {

	@IsNotEmpty()
	@ApiProperty()
	readonly churchId: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly name: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly title: string;

	@IsNotEmpty()
	@IsEmail()
	@ApiProperty()
	readonly email: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly password: string;

	@IsNotEmpty()
	@ApiProperty({ default: true })
	readonly isEnabled: boolean;

	@ApiProperty({ enum: EntityNameEnum, enumName: 'Church Admin Role', default: EntityChurchAdminRoleEnum.viewer })
	@IsEnum(EntityChurchAdminRoleEnum, { message: 'Invalid church admin role' })
	role: EntityChurchAdminRoleEnum;

}