import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { EntityGenderEnum } from 'src/common/enums/entity-gender.enum';
import { EntityMaritalStatusEnum } from 'src/common/enums/entity-maritalstatus.enum';

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
