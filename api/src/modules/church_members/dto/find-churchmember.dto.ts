import { IsEmail, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from 'src/common/dto/find.dto';
import { EntityAgeEnum } from 'src/common/enums/entity-age.enum';
import { EntityMaritalStatusEnum } from 'src/common/enums/entity-maritalstatus.enum';
import { EntityEducationalLevelEnum } from 'src/common/enums/entity-education.enum';
import { EntitySundayServiceEnum } from 'src/common/enums/entity-sunday_service.enum';

export class FindChurchMemberDto extends FindDto {
	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by full name' })
	churchId?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by full name' })
	full_name?: string;

	@IsEnum(EntityAgeEnum)
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by age range' })
	age?: EntityAgeEnum;

	@IsEmail()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by email' })
	email?: string;

	@IsEnum(EntityMaritalStatusEnum)
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by marital status' })
	marital_status?: EntityMaritalStatusEnum;

	@IsInt()
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by number of children' })
	no_of_children?: number;

	@IsEnum(EntityEducationalLevelEnum)
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter by educational level' })
	education_level?: EntityEducationalLevelEnum;

	

}
