import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChurchEntity } from './entities/church.entity';
import { ChurchController } from './controllers/church.controller';
import { ChurchService } from './services/church.service';

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([ChurchEntity])],
	controllers: [
		ChurchController, 
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
export class ChurchModule { }