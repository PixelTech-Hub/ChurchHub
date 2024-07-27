import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Patch,
	Post,
	Request,
	UseInterceptors,
} from '@nestjs/common';
import {
	ApiNotAcceptableResponse,
	ApiOkResponse,
	ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { UserConnection } from '../models/user-connection.model';
import { Email } from 'src/common/models/email.model';
import { LoginDto } from 'src/common/dto/login.dto';
import { CreateChurchAdminDto } from 'src/modules/admins/dto/create-churchadmin.dto';
import { UpdatePasswordDto } from 'src/common/models/update-password.dto';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users/auth')
@Controller('users/auth')
export class AuthController {
	constructor(private authService: AuthService) { }

	@Post('signup')
	@ApiOkResponse({ type: UserConnection })
	async signup(@Body() dto: CreateChurchAdminDto): Promise<Email> {
		return this.authService.signUp(dto);
	}

	@Post('login')
	@ApiOkResponse({ type: UserConnection })
	@ApiNotAcceptableResponse()
	async login(@Body() dto: LoginDto): Promise<UserConnection> {
		return this.authService.login(dto);
	}

	@Patch('update-password')
	// @UseGuards(JwtAuthGuard)
	async updatePassword(
		@Request() req,
		@Body() updatePasswordDto: UpdatePasswordDto,
	) {
		await this.authService.updatePassword(
			req.user.id,
			updatePasswordDto.currentPassword,
			updatePasswordDto.newPassword,
		);
		return { message: 'Password updated successfully' };
	}

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