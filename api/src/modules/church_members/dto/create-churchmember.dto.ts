import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsEnum, IsInt, IsNotEmpty, IsPhoneNumber, IsString, Min, ValidateNested } from 'class-validator';
import { EntityChurchMinistriesEnum } from 'src/common/enums/EntityChurchMinistriesEnum';
import { EntityAgeEnum } from 'src/common/enums/entity-age.enum';
import { EntityEducationalLevelEnum } from 'src/common/enums/entity-education.enum';
import { EntityGenderEnum } from 'src/common/enums/entity-gender.enum';
import { EntityMaritalStatusEnum } from 'src/common/enums/entity-maritalstatus.enum';
import { EntitySundayServiceEnum } from 'src/common/enums/entity-sunday_service.enum';

export class CreateChurchMemberDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	churchId: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	full_name: string;

	@ApiProperty()
	@IsEnum(EntityGenderEnum)
	@IsNotEmpty()
	gender: EntityGenderEnum;

	@ApiProperty()
	// @IsPhoneNumber()
	@IsString()
	phone_number: string;


	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	job: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	residence: string;

	@ApiProperty()
	@IsEnum(EntityAgeEnum)
	@IsNotEmpty()
	age: EntityAgeEnum;

	@ApiProperty()
	@IsEnum(EntityMaritalStatusEnum)
	@IsNotEmpty()
	marital_status: EntityMaritalStatusEnum;

	@ApiProperty()
	@IsString()
	no_of_children: string;

	@ApiProperty()
	@IsEnum(EntityEducationalLevelEnum)
	// @IsNotEmpty()
	education_level: EntityEducationalLevelEnum;


	@ApiProperty({ type: [String] })
	@IsArray()
	@IsString({ each: true })
	church_ministries_ids: string[];

	

}
