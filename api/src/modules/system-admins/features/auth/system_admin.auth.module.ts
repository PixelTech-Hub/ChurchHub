import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CONFIG_JWT_SECRET } from 'src/config/app.config';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { SystemAuthService } from './services/system_auth.service';
import {  SystemAuthController } from './controllers/system_auth.controller';
import { SystemAdminModule } from '../../system_admin.module';
import { SystemAdminsJwtStrategy } from './system_admin.jwt.strategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: CONFIG_JWT_SECRET,
			signOptions: { expiresIn: '7d' },
		}),
		SystemAdminModule,
	],
	controllers: [SystemAuthController],
	providers: [
		SystemAuthService,
		SystemAdminsJwtStrategy,
		ConfigService,
	],
	exports: [
		JwtModule,
		ConfigService,
		SystemAdminsJwtStrategy,
	],
})
export class SystemAuthModule { }