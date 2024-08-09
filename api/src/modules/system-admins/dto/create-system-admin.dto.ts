import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EntityNameEnum } from 'src/common/enums/entity-name.enum';
import { EntitySystemAdminRoleEnum } from '../enums/system_admin.enum';

export class CreateSystemAdminDto {


	@IsNotEmpty()
	@ApiProperty()
	readonly name: string;

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

	@ApiProperty({ enum: EntityNameEnum, enumName: 'Church Admin Role', default: EntitySystemAdminRoleEnum.viewer })
	@IsEnum(EntitySystemAdminRoleEnum, { message: 'Invalid church admin role' })
	role: EntitySystemAdminRoleEnum;


	@IsOptional()
	@ApiProperty()
	readonly phone_number: string;

	@IsOptional()
	@ApiProperty()
	readonly dob: string;

	@IsOptional()
	@ApiProperty()
	readonly position: string;

	@IsOptional()
	@ApiProperty()
	readonly department: string;

	@IsOptional()
	@ApiProperty()
	readonly address: string;
}