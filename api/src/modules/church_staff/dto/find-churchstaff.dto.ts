import { IsEmail, IsEnum, IsInt, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from 'src/common/dto/find.dto';
import { EntityAgeEnum } from 'src/common/enums/entity-age.enum';
import { EntityMaritalStatusEnum } from 'src/common/enums/entity-maritalstatus.enum';
import { EntityEducationalLevelEnum } from 'src/common/enums/entity-education.enum';
import { EntitySundayServiceEnum } from 'src/common/enums/entity-sunday_service.enum';
import { EntityGenderEnum } from 'src/common/enums/entity-gender.enum';

export class FindChurchStaffDto extends FindDto {
	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by full name' })
	churchId?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by full name' })
	first_name?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by full name' })
	last_name?: string;

	@IsEnum(EntityGenderEnum)
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by gender status' })
	gender?: EntityGenderEnum;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by dob' })
	dob?: string;

	@IsEmail()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by email' })
	email?: string;

	@IsEnum(EntityMaritalStatusEnum)
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by marital status' })
	marital_status?: EntityMaritalStatusEnum;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by disability' })
	disability?: boolean;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by address' })
	address?: string;

	@IsPhoneNumber()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by phone number' })
	phone_number?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by phone number' })
	baptised?: boolean;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by phone number' })
	career?: string;
}
