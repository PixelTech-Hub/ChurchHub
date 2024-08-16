import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Patch,
	Post,
	Request,
	UseInterceptors,
	UseGuards,
	Get,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import {
	ApiNotAcceptableResponse,
	ApiOkResponse,
	ApiTags,
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
} from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { UserConnection } from '../models/user-connection.model';
import { Email } from 'src/common/models/email.model';
import { LoginDto } from 'src/common/dto/login.dto';
import { CreateChurchAdminDto } from 'src/modules/admins/dto/create-churchadmin.dto';
import { UpdatePasswordDto } from 'src/common/models/update-password.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { VerifyEmailOtpDto } from 'src/common/models/verify-email-otp.dto';
import { AdminEntity } from 'src/modules/admins/entities/admin.entity';
import { VerifyOtpDto } from 'src/common/dto/verifyOtp.dto';
import { EmailDto } from 'src/common/dto/email.dto';
import { ResetPasswordDto } from 'src/common/dto/reset-password.dto';


@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users/auth')
@Controller('users/auth')
export class AuthController {
	constructor(private authService: AuthService) { }

	@Post('signup')
	@ApiOkResponse({ type: Email })
	async signup(@Body() dto: CreateChurchAdminDto): Promise<Email> {
		return this.authService.signUp(dto);
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Login and send OTP' })
	@ApiResponse({ status: 200, description: 'OTP sent successfully' })
	async login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto);
	}

	@Post('verify-otp')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Verify OTP and complete login' })
	@ApiResponse({ status: 200, type: UserConnection })
	async verifyOtpAndLogin(@Body() verifyOtpDto: VerifyOtpDto): Promise<UserConnection> {
		return this.authService.verifyOtpAndLogin(verifyOtpDto);
	}

	@Post('forgot-password')
	async forgotPassword(@Body() dto: EmailDto) {
		return this.authService.sendPasswordResetLink(dto);
	}

	@Post('reset-password')
	async resetPassword(@Body() dto: ResetPasswordDto) {
		await this.authService.resetPassword(dto);
		return { message: 'Password has been reset successfully.' };
	}

	// @Post('verify-email')
	// @UseGuards(JwtAuthGuard)
	// @HttpCode(HttpStatus.OK)
	// @ApiOperation({ summary: 'Verify email address' })
	// @ApiResponse({ status: 200, description: 'Email verified successfully' })
	// async verifyEmail(@Body('token') token: string) {
	// 	return this.authService.verifyEmail(token);
	// }

	// @Post('resend-verification-email')
	// @UseGuards(JwtAuthGuard)
	// @ApiBearerAuth()
	// @HttpCode(HttpStatus.OK)
	// @ApiOperation({ summary: 'Resend verification email' })
	// @ApiResponse({ status: 200, description: 'Verification email sent' })
	// async resendVerificationEmail(@Request() req) {
	// 	const admin = await this.authService.getLoggedInUserDetails(req.user.sub);
	// 	await this.authService.sendVerificationEmail(admin);
	// 	return { message: 'Verification email sent successfully' };
	// }

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
	@Get('me')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: AdminEntity, description: 'Get logged in user details' })
	async getLoggedInUser(@Request() req): Promise<AdminEntity> {
		return this.authService.getLoggedInUserDetails(req.user.sub);
	}
}
