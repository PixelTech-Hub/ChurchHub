import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateSystemAdminDto } from './create-system-admin.dto';

export class UpdateSystemAdminDto extends PartialType(
	OmitType(CreateSystemAdminDto, ['email', 'password'] as const),
) { }