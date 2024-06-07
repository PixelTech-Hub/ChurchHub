import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinistryEntity } from './entities/ministry.entity';
import { MinistryController } from './controllers/ministry.controller';
import { ChurchMinistryService } from './services/ministry.service';

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([MinistryEntity])],
	controllers: [
		MinistryController,
	],
	providers: [
		ChurchMinistryService,
		ConfigService,
	],
	exports: [
		TypeOrmModule,
		ChurchMinistryService
	],
})
export class MinistriesModule { }