import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemAdminEntity } from './entities/system_admin.entity';
import { SystemAdminService } from './services/system_admin.service';
import { SystemAdminController } from './controllers/system_admin.controller';
import { AccountController } from '../admins/controllers/account.controller';
import { SystemAccountController } from './controllers/system-account.controller';

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([SystemAdminEntity])],
	controllers: [
		SystemAdminController,
		SystemAccountController
	],
	providers: [
		SystemAdminService,
		ConfigService,
	],
	exports: [
		TypeOrmModule,
		SystemAdminService
	],
})
export class SystemAdminModule { }