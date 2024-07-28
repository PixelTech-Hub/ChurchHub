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
} from '@nestjs/common';
import {
	ApiNotAcceptableResponse,
	ApiOkResponse,
	ApiTags,
	ApiBearerAuth,
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
	@ApiOkResponse({ type: UserConnection })
	@ApiNotAcceptableResponse()
	async login(@Body() dto: LoginDto): Promise<UserConnection> {
		return this.authService.login(dto);
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
	@Get('me')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: AdminEntity, description: 'Get logged in user details' })
	async getLoggedInUser(@Request() req): Promise<AdminEntity> {
		return this.authService.getLoggedInUserDetails(req.user.sub);
	}
}
