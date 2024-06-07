import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChurchServiceEntity } from './entities/church-service.entity';
import { ChurchServiceController } from './controllers/church_service.controller';
import { ChurchService } from './services/church-services.service';

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([ChurchServiceEntity])],
	controllers: [
		ChurchServiceController,
	],
	providers: [
		ChurchService,
		ConfigService,
	],
	exports: [
		TypeOrmModule,
		ChurchService
	],
})
export class ChurchServiceModule { }