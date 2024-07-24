import {
	Controller,
	Body,
	Patch,
	UseInterceptors,
	ClassSerializerInterceptor,
	UseGuards,
	Get,
} from '@nestjs/common';
import { ApiBasicAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ChurchAdminAuthGuard } from '../features/auth/guards/admin.auth.guard';
import { CurrentUser } from '../features/auth/decorators/current-user.decorator';
import { UpdatePasswordDto } from 'src/common/dto/update-password.dto';
import { SystemAdminService } from '../services/system_admin.service';
import { SystemAdminEntity } from '../entities/system_admin.entity';

@UseInterceptors(ClassSerializerInterceptor)

@ApiBasicAuth()
@ApiTags('admin/account')
@Controller('admin/account')
export class SystemAccountController {
	constructor(private readonly adminService: SystemAdminService) { }

	@Get()
	@UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: SystemAdminEntity })
	findOne(
		@CurrentUser() currentAdmin: SystemAdminEntity,
	): Promise<SystemAdminEntity> {
		return this.adminService.findOneByField(currentAdmin.id);
	}

	// @Patch('profile')
	// @ApiOkResponse({ type: AdminEntity })
	// update(
	//   @Body() dto: UpdateChurchAdminDto,
	//   @CurrentUser() currentAdmin: AdminEntity,
	// ): Promise<AdminEntity> {
	//   return this.adminService.update(currentAdmin.id, dto);
	// }

	// @Patch('email/initiate')
	// @ApiOkResponse({ type: SendOtpToEmailDto })
	// sendOtpForEmailUpdate(
	//   @Body() dto: SendOtpToEmailDto,
	//   @CurrentOrganizationAdmin() currentAdmin: UserEntity,
	// ): Promise<SendOtpToEmailDto> {
	//   return this.usersService.sendOtpForEmailUpdate(dto, currentAdmin);
	// }

	// @Patch('email/verify-otp')
	// @ApiOkResponse({ type: UserEntity })
	// verifyOtpForEmailUpdate(
	//   @Body() dto: VerifyEmailOtpDto,
	//   @CurrentOrganizationAdmin() currentAdmin: UserEntity,
	// ): Promise<VerifyEmailOtpDto> {
	//   return this.usersService.verifyOtpForEmailUpdate(dto, currentAdmin);
	// }

	@Patch('password')
	@ApiOkResponse({ type: SystemAdminEntity })
	@ApiBody({ type: UpdatePasswordDto })
	updatePassword(
		@Body() dto: UpdatePasswordDto,
		@CurrentUser() currentAdmin: SystemAdminEntity,
	): Promise<SystemAdminEntity> {
		return this.adminService.updatePassword(dto, currentAdmin);
	}
}