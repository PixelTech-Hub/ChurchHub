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
  
  @Injectable()
  export class AuthService {
	otp: any;
	organizationAdminsService: any;
	constructor(
	  private jwtService: JwtService,
	  private usersService: AdminService,
	  private configService: ConfigService,
	  private otpService: OtpService
	) {}
  
	async signUp(dto: CreateChurchAdminDto): Promise<Email> {
	  // Check if there is an admin with the same email
	  const existingChurchAdminWithEmail = await this.usersService.findOneByField(dto.email, 'email');
	  if (existingChurchAdminWithEmail)
		throw new NotAcceptableException(ExceptionEnum.adminEmailTaken);
  
	  // Hash the password
	  const hashedPassword = await bcrypt.hash(
		dto.password,
		CONFIG_PASSWORD_HASH_SALT,
	  );
  
	  // Generate OTP
	  const { otp, otpExpiresAt } = this.otpService.generate();
  
	  // Save the new admin with OTP
	  const admin = await this.usersService.save({
		...dto,
		password: hashedPassword,
		otp,
		otpExpiresAt,
		isEmailVerified: false, // Set this to false initially
	  });
  
	  // Send OTP to email
	  await this.otpService.sendToEmail(otp, { name: admin.name, email: admin.email });
  
	  return { email: admin.email };
	}
  
	async login(dto: LoginDto): Promise<UserConnection> {
	  const admin = await this.usersService.findOneByField(dto.email, 'email');
	  if (!admin)
		throw new NotAcceptableException(ExceptionEnum.emailOrPasswordIncorrect);
  
	  if (!(await bcrypt.compare(dto.password, admin.password)))
		throw new NotAcceptableException(ExceptionEnum.wrongPassword);
  
	  // Generate new OTP for login verification
	  const { otp, otpExpiresAt } = this.otpService.generate();
  
	  // Update admin with new OTP
	  admin.otp = otp;
	  admin.otpExpiresAt = otpExpiresAt;
	  await this.usersService.save(admin);
  
	  // Send OTP to email
	  await this.otpService.sendToEmail(otp, { name: admin.name, email: admin.email });
  
	  // Return a partial connection without the access token
	  return { data: admin, requiresOtp: true };
	}
  
	// Add a new method to verify login OTP
	async verifyLoginOtp(email: string, otp: number): Promise<UserConnection> {
	  const admin = await this.usersService.findOneByField(email, 'email');
	  if (!admin) throw new NotFoundException(ExceptionEnum.adminNotFound);
  
	  // Verify OTP
	  this.otpService.verify(admin, otp);
  
	  // Clear OTP after successful verification
	  admin.otp = null;
	  admin.otpExpiresAt = null;
	  await this.usersService.save(admin);
  
	  // Generate and return full connection
	  const accessToken = this.getAccessToken(admin);
	  return { accessToken, data: admin };
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
  
	async verifyEmailOtp(dto: VerifyEmailOtpDto): Promise<UserConnection> {
	  let admin = await this.usersService.findOneByField(dto.email, 'email');
	  if (!admin) throw new NotFoundException(ExceptionEnum.adminNotFound);
  
	  // Verify Otp
	  this.otpService.verify(admin, dto.otp);
  
	  // Set verification to true & Update otp
	  admin = {
		...admin,
		isEmailVerified: true,
		otp: null,
		otpExpiresAt: null,
	  };
	  await this.organizationAdminsService.save(admin);
  
	  return this.getConnection(admin);
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
  }
  