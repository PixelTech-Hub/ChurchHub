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
import { AdminService } from '../services/admin.service';
import { AdminEntity } from '../entities/admin.entity';
import { CurrentUser } from '../features/auth/decorators/current-user.decorator';
import { UpdateChurchAdminDto } from '../dto/update-churchadmin.dto';
import { UpdatePasswordDto } from 'src/common/dto/update-password.dto';

@UseInterceptors(ClassSerializerInterceptor)

@ApiBasicAuth()
@ApiTags('user/account')
@Controller('user/account')
export class AccountController {
	constructor(private readonly adminService: AdminService) { }

	@Get()
	@UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: AdminEntity })
	findOne(
		@CurrentUser() currentAdmin: AdminEntity,
	): Promise<AdminEntity> {
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
	@ApiOkResponse({ type: AdminEntity })
	@ApiBody({ type: UpdatePasswordDto })
	updatePassword(
		@Body() dto: UpdatePasswordDto,
		@CurrentUser() currentAdmin: AdminEntity,
	): Promise<AdminEntity> {
		return this.adminService.updatePassword(dto, currentAdmin);
	}
}