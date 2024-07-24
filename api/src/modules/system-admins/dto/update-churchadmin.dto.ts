import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateChurchAdminDto } from './create-churchadmin.dto';

export class UpdateChurchAdminDto extends PartialType(
	OmitType(CreateChurchAdminDto, ['email', 'password'] as const),
) { }