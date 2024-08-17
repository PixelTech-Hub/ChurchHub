import {
	Injectable,
	NotAcceptableException,
	NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/common/dto/login.dto';
import { ExceptionEnum } from 'src/common/enums/exception.enum';
import { CONFIG_PASSWORD_HASH_SALT } from 'src/config/app.config';
import { UserConnection } from '../models/user-connection.model';
import { JwtTokenPayloadModel } from 'src/common/models/jwt-token-payload.model';
import { AdminService } from 'src/modules/admins/services/admin.service';
import { CreateChurchAdminDto } from 'src/modules/admins/dto/create-churchadmin.dto';
import { Email } from 'src/common/models/email.model';
import { AdminEntity } from 'src/modules/admins/entities/admin.entity';
import { EntityChurchAdminRoleEnum } from 'src/modules/admins/enums/admin.enum';
import { VerifyEmailOtpDto } from 'src/common/models/verify-email-otp.dto';
import { OtpService } from 'src/modules/shared/services/otp.service';
import { VerifyOtpDto } from 'src/common/dto/verifyOtp.dto';
import { MailService } from 'src/modules/shared/services/mails.service';
import { EmailDto } from 'src/common/dto/email.dto';
import { ResetPasswordDto } from 'src/common/dto/reset-password.dto';

@Injectable()
export class AuthService {
	otp: any;
	organizationAdminsService: any;
	constructor(
		private jwtService: JwtService,
		private usersService: AdminService,
		private configService: ConfigService,
		private otpService: OtpService,
		private mailService: MailService
	) { }

	async signUp(dto: CreateChurchAdminDto): Promise<Email> {
		// -- Check if there is a main-dashboard with the same email
		const existingChurchAdminWithEmail = await this.usersService.findOneByField(dto.email, 'email');
		if (existingChurchAdminWithEmail)
			throw new NotAcceptableException(ExceptionEnum.adminEmailTaken);

		// -- Hashing the password: So that they are protected from whoever can access the database.
		const hashedPassword = await bcrypt.hash(
			dto.password,
			CONFIG_PASSWORD_HASH_SALT,
		);

		// -- Save & return the new main-dashboard
		const admin = await this.usersService.save({
			...dto,
			password: hashedPassword,
		});
		return { email: admin.email };
	}

	async login(dto: LoginDto): Promise<{ message: string }> {
		const admin = await this.usersService.findOneByField(dto.email, 'email');


		if (!admin)
			throw new NotAcceptableException(ExceptionEnum.emailOrPasswordIncorrect);

		if (!(await bcrypt.compare(dto.password, admin.password)))
			throw new NotAcceptableException(ExceptionEnum.wrongPassword);

		// Generate OTP
		const { otp, otpExpiresAt } = this.otpService.generate();

		// Save OTP to user
		admin.otp = otp;
		admin.otpExpiresAt = otpExpiresAt;
		await this.usersService.save(admin);

		// Send OTP to user's email
		await this.mailService.sendChurchAdminLoginOtp(dto, admin.church?.name, otp, admin.name)
		return { message: 'OTP sent to your email. Please verify to complete login.' };
	}
	async verifyOtpAndLogin(dto: VerifyOtpDto): Promise<UserConnection> {
		const admin = await this.usersService.findOneByField(dto.email, 'email');
		if (!admin)
			throw new NotAcceptableException(ExceptionEnum.emailOrPasswordIncorrect);

		const isOtpValid = this.otpService.verify(admin, dto.otp);
		if (!isOtpValid)
			throw new NotAcceptableException(ExceptionEnum.otpIncorrect);

		// Clear OTP after successful verification
		admin.otp = null;
		admin.otpExpiresAt = null;
		await this.usersService.save(admin);

		return this.getConnection(admin);
	}

	async getLoggedInUserDetails(userId: string): Promise<AdminEntity> {
		const user = await this.usersService.findOneByField(userId, 'id');
		if (!user) {
			throw new NotFoundException(ExceptionEnum.userNotFound);
		}
		return user;
	}


	async updatePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
		const user = await this.usersService.findOneByField(userId, 'id');
		if (!user) {
			throw new NotFoundException(ExceptionEnum.userNotFound);
		}

		const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
		if (!isPasswordValid) {
			throw new NotAcceptableException(ExceptionEnum.wrongPassword);
		}

		const hashedNewPassword = await bcrypt.hash(
			newPassword,
			CONFIG_PASSWORD_HASH_SALT,
		);

		user.password = hashedNewPassword;
		await this.usersService.save(user);
	}









	async getConnection(admin: AdminEntity): Promise<UserConnection> {
		const accessToken: string = this.getAccessToken(admin);
		return { accessToken, data: admin };
	}

	getAccessToken(admin: AdminEntity): string {
		const payload: JwtTokenPayloadModel = {
			sub: admin.id,
			entityName: EntityChurchAdminRoleEnum.superadmin,
		};
		return this.jwtService.sign(payload);
	}



	// ################################
	async sendPasswordResetLink(dto: EmailDto): Promise<{ message: string }> {
		const admin = await this.usersService.findOneByField(dto.email, 'email');
		if (!admin) {
		  throw new NotFoundException(ExceptionEnum.userNotFound);
		}
	
		// Generate a reset token
		const resetToken = this.jwtService.sign(
		  { sub: admin.id },
		  { expiresIn: '1h' } // Token expires in 1 hour
		);
	
		// Save the reset token to the user (you might need to add a resetToken field to your user model)
		admin.resetToken = resetToken;
		await this.usersService.save(admin);
	
		// Send the email with the reset link
		await this.mailService.sendPasswordResetLink(admin.email, resetToken, admin.name, admin.church?.name);
	
		return { message: 'Password reset link has been sent to your email.' };
	  }
	
	  async resetPassword(dto: ResetPasswordDto): Promise<void> {
		try {
		  // Verify the token
		  const payload = this.jwtService.verify(dto.token);
		  const admin = await this.usersService.findOneByField(payload.sub, 'id');
	  
		  if (!admin || admin.resetToken !== dto.token) {
			throw new NotAcceptableException(ExceptionEnum.invalidResetToken);
		  }
	  
		  // Check if the token has expired
		  if (admin.resetTokenExpiresAt && new Date() > admin.resetTokenExpiresAt) {
			throw new NotAcceptableException(ExceptionEnum.resetTokenExpired);
		  }
	  
		  // Check if the new password is different from the current password
		  const isCurrentPassword = await bcrypt.compare(dto.newPassword, admin.password);
		  if (isCurrentPassword) {
			throw new NotAcceptableException(ExceptionEnum.newPasswordSameAsOld);
		  }
	  
		  // Hash the new password
		  const hashedNewPassword = await bcrypt.hash(
			dto.newPassword,
			CONFIG_PASSWORD_HASH_SALT,
		  );
	  
		  // Update the admin's password and clear the reset token
		  admin.password = hashedNewPassword;
		  admin.resetToken = null;
		  admin.resetTokenExpiresAt = null;
		  await this.usersService.save(admin);
		} catch (error) {
		  if (error instanceof NotAcceptableException) {
			throw error;
		  }
		  throw new NotAcceptableException(ExceptionEnum.invalidResetToken);
		}
	  }
}