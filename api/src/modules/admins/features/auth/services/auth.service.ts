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
import { UpdatePasswordWithTokenDto } from 'src/common/models/update-password-with-token.dto';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private usersService: AdminService,
		private configService: ConfigService,
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

	async login(dto: LoginDto): Promise<UserConnection> {
		// --
		let admin = await this.usersService.findOneByField(
			dto.email,
			'email',
		);
		if (!admin)
			throw new NotAcceptableException(ExceptionEnum.emailOrPasswordIncorrect);



		// -- Check password
		if (!(await bcrypt.compare(dto.password, admin.password)))
			throw new NotAcceptableException(ExceptionEnum.emailOrPasswordIncorrect);


		// -- Return the main-dashboard and the access token
		return {
			accessToken: this.getAccessToken(admin),
			data: admin,
		};
	}

	// async verifyEmailOtp(
	// 	dto: VerifyEmailOtpDto,
	// ): Promise<OrganizationAdminConnection> {
	// 	// -- On account creation
	// 	let admin = await this.organizationAdminsService.findOneByField(
	// 		dto.email,
	// 		'email',
	// 	);
	// 	if (!admin) throw new NotFoundException(ExceptionEnum.adminNotFound);

	// 	// -- Verify Otp
	// 	this.otp.verify(admin, dto.otp);

	// 	// -- Set verification to true & Update otp
	// 	admin = {
	// 		...admin,
	// 		isEmailVerified: true,
	// 		otp: null,
	// 		otpExpiresAt: null,
	// 	};
	// 	await this.organizationAdminsService.save(admin);

	// 	// --
	// 	return this.getConnection(admin);
	// }

	// async sendOtpToEmailForPasswordRecovery(
	// 	dto: SendOtpToEmailDto,
	// ): Promise<Email> {
	// 	let admin = await this.organizationAdminsService.findOneByField(
	// 		dto.email,
	// 		'email',
	// 	);
	// 	if (!admin) throw new NotAcceptableException(ExceptionEnum.accountNotFound);

	// 	// -- Generate Otp
	// 	const otpData = this.otp.generate();

	// 	// -- Save otp
	// 	admin = {
	// 		...admin,
	// 		...otpData,
	// 		emailUpdateCandidate: null,
	// 	};
	// 	await this.organizationAdminsService.save(admin);

	// 	// -- Send otp
	// 	await this.otp.sendToEmail(otpData.otp, admin);

	// 	// --
	// 	return { email: admin.email };
	// }

	// async verifyEmailOtpForPasswordRecovery(
	// 	dto: VerifyEmailOtpDto,
	// ): Promise<PasswordRecoveryToken> {
	// 	// On account creation
	// 	let admin = await this.organizationAdminsService.findOneByField(
	// 		dto.email,
	// 		'email',
	// 	);
	// 	if (!admin) throw new NotFoundException(ExceptionEnum.adminNotFound);

	// 	// -- Verify Otp
	// 	this.otp.verify(admin, dto.otp);

	// 	// -- Since it's correct. We generate a password update token. That also expires in 30 minutes
	// 	// -- Generate Otp
	// 	const otpData = this.otp.generate();

	// 	// -- Set verification to true & Update otp
	// 	admin = {
	// 		...admin,
	// 		...otpData,
	// 		isEmailVerified: true,
	// 		emailUpdateCandidate: null,
	// 	};
	// 	await this.organizationAdminsService.save(admin);

	// 	// --
	// 	return {
	// 		email: admin.email,
	// 		passwordUpdateToken: CryptoJS.AES.encrypt(
	// 			otpData.otp.toString(),
	// 			this.configService.get('CRYPTO_GENERAL_SECRET'),
	// 		).toString(),
	// 	};
	// }

	// async updatePasswordForPasswordRecovery(
	// 	dto: UpdatePasswordWithTokenDto,
	// ): Promise<UserConnection> {
	// 	// On account creation
	// 	let admin = await this.usersService.findOneByField(
	// 		dto.email,
	// 		'email',
	// 	);
	// 	if (!admin) throw new NotFoundException(ExceptionEnum.adminNotFound);

	// 	// -- Verify Otp
	// 	let otpFromToken;
	// 	try {
	// 		const bytes = Crypto.AES.decrypt(
	// 			dto.passwordUpdateToken,
	// 			this.configService.get('CRYPTO_GENERAL_SECRET'),
	// 		);
	// 		otpFromToken = parseInt(bytes.toString(CryptoJS.enc.Utf8));
	// 	} catch (e) { }
	// 	if (!otpFromToken)
	// 		throw new NotAcceptableException(ExceptionEnum.passwordTokenInvalid);
	// 	this.otp.verify(admin, otpFromToken);

	// 	// -- Set verification to true & Update otp
	// 	const hashedPassword = await bcrypt.hash(
	// 		dto.password,
	// 		CONFIG_PASSWORD_HASH_SALT,
	// 	);
	// 	admin = {
	// 		...admin,
	// 		otp: null,
	// 		otpExpiresAt: null,
	// 		password: hashedPassword,
	// 		temporaryPassword: null,
	// 	};
	// 	await this.organizationAdminsService.save(admin);

	// 	// --
	// 	return this.getConnection(admin);
	// }

	async getConnection(
		admin: AdminEntity,
	): Promise<UserConnection> {
		const accessToken: string = this.getAccessToken(admin);
		return { accessToken, data: admin };
	}

	getAccessToken(admin: AdminEntity): string {
		const payload = <JwtTokenPayloadModel>(<unknown>{
			sub: admin.id,
			entityName: EntityChurchAdminRoleEnum.superadmin,
		});
		return this.jwtService.sign(payload);
	}
}