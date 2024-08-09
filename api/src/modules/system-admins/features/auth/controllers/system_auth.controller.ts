import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Patch,
	Post,
	Request,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiNotAcceptableResponse,
	ApiOkResponse,
	ApiTags,
} from '@nestjs/swagger';
import { UserConnection } from '../models/user-connection.model';
import { Email } from 'src/common/models/email.model';
import { LoginDto } from 'src/common/dto/login.dto';
import { CreateChurchAdminDto } from 'src/modules/admins/dto/create-churchadmin.dto';
import { SystemAuthService } from '../services/system_auth.service';
import { CreateSystemAdminDto } from 'src/modules/system-admins/dto/create-system-admin.dto';
import { SystemAdminEntity } from 'src/modules/system-admins/entities/system_admin.entity';
import { JwtAuthGuard } from 'src/modules/admins/features/auth/guards/jwt-auth.guard';
import { UpdatePasswordDto } from 'src/common/dto/update-password.dto';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Admin Authentication')
@Controller('admin/auth')
export class SystemAuthController {
	constructor(private authService: SystemAuthService) { }

	@Post('signup')
	@ApiOkResponse({ type: UserConnection })
	async signup(@Body() dto: CreateSystemAdminDto): Promise<Email> {
		return this.authService.signUp(dto);
	}

	@Post('login')
	@ApiOkResponse({ type: UserConnection })
	@ApiNotAcceptableResponse()
	async login(@Body() dto: LoginDto): Promise<UserConnection> {
		return this.authService.login(dto);
	}

	

	@Get('me')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: SystemAdminEntity, description: 'Get logged in admin details' })
	async getLoggedInUser(@Request() req): Promise<SystemAdminEntity> {
		return this.authService.getLoggedInAdminDetails(req.user.sub);
	}

	@Patch('update-password')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Password updated successfully' })
	async updatePassword(
		@Request() req,
		@Body() updatePasswordDto: UpdatePasswordDto,
	) {
		await this.authService.updatePassword(
			req.user.sub, // Using sub from JWT payload as user ID
			updatePasswordDto.currentPassword,
			updatePasswordDto.newPassword,
		);
		return { message: 'Password updated successfully' };

	}

	// 	@Post('verify-email')
	//   @ApiOkResponse({ type: OrganizationAdminConnection })
	//   @ApiNotAcceptableResponse()
	//   async verifyEmailOtp(
	//     @Body() dto: VerifyEmailOtpDto,
	//   ): Promise<OrganizationAdminConnection> {
	//     return this.adminsAuthService.verifyEmailOtp(dto);
	//   }

	//   @Post('password-recovery/initiate')
	//   @ApiOkResponse({ type: Email })
	//   @ApiNotAcceptableResponse()
	//   async sendOtpToEmailForPasswordRecovery(
	//     @Body() dto: SendOtpToEmailDto,
	//   ): Promise<Email> {
	//     return this.adminsAuthService.sendOtpToEmailForPasswordRecovery(dto);
	//   }

	//   @Post('password-recovery/verify-otp')
	//   @ApiOkResponse({ type: PasswordRecoveryToken })
	//   @ApiNotFoundResponse()
	//   async verifyEmailOtpForPasswordRecovery(
	//     @Body() dto: VerifyEmailOtpDto,
	//   ): Promise<PasswordRecoveryToken> {
	//     return this.adminsAuthService.verifyEmailOtpForPasswordRecovery(dto);
	//   }

	//   @Post('password-recovery/update-password')
	//   @ApiOkResponse({ type: OrganizationAdminConnection })
	//   @ApiNotFoundResponse()
	//   @ApiNotAcceptableResponse()
	//   async updatePasswordForPasswordRecovery(
	//     @Body() dto: UpdatePasswordWithTokenDto,
	//   ): Promise<OrganizationAdminConnection> {
	//     return this.adminsAuthService.updatePasswordForPasswordRecovery(dto);
	//   }

}