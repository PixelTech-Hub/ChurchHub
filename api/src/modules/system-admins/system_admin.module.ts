import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entities/admin.entity';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { AccountController } from './controllers/account.controller';

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([AdminEntity])],
	controllers: [
		AdminController,
		AccountController
	],
	providers: [
		AdminService,
		ConfigService,
	],
	exports: [
		TypeOrmModule,
		AdminService
	],
})
export class AdminModule { }