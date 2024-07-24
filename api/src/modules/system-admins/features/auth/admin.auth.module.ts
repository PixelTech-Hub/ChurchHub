import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CONFIG_JWT_SECRET } from 'src/config/app.config';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AdminModule } from '../../system_admin.module';
import { ChurchAdminsJwtStrategy } from './admin.jwt.strategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: CONFIG_JWT_SECRET,
			signOptions: { expiresIn: '7d' },
		}),
		AdminModule,
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		ChurchAdminsJwtStrategy,
		ConfigService,
	],
	exports: [
		JwtModule,
		ConfigService,
		ChurchAdminsJwtStrategy,
	],
})
export class AuthModule { }