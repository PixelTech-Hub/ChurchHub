import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsInt, IsNotEmpty, IsPhoneNumber, IsString, Min, ValidateNested } from 'class-validator';
import { EntityChurchMinistriesEnum } from 'src/common/enums/EntityChurchMinistriesEnum';
import { EntityAgeEnum } from 'src/common/enums/entity-age.enum';
import { EntityEducationalLevelEnum } from 'src/common/enums/entity-education.enum';
import { EntityGenderEnum } from 'src/common/enums/entity-gender.enum';
import { EntityMaritalStatusEnum } from 'src/common/enums/entity-maritalstatus.enum';
import { EntitySundayServiceEnum } from 'src/common/enums/entity-sunday_service.enum';

export class CreateChurchStaffDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	churchId: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	first_name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	last_name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	position: string;

	@ApiProperty()
	@IsEnum(EntityGenderEnum)
	@IsNotEmpty()
	gender: EntityGenderEnum;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	dob: string;

	@ApiProperty()
	@IsEnum(EntityMaritalStatusEnum)
	@IsNotEmpty()
	marital_status: EntityMaritalStatusEnum;

	@ApiProperty()
	@IsBoolean()
	@IsNotEmpty()
	disability: boolean;


	@ApiProperty()
	@IsPhoneNumber()
	phone_number: string;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsString()
	account_name: string;

	@ApiProperty()
	@IsString()
	account_no: string;

	@ApiProperty()
	@IsBoolean()
	baptised: boolean;

	@ApiProperty()
	@IsString()
	residence: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	career: string;

}
