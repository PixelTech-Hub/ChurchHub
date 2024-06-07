import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityController } from './controllers/activity.controller';
import { ActivityService } from './services/activity.service';
import { ActivityEntity } from './entities/activity.entity';

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([ActivityEntity])],
	controllers: [
		ActivityController,
	],
	providers: [
		ActivityService,
		ConfigService,
	],
	exports: [
		TypeOrmModule,
		ActivityService
	],
})
export class ActivityModule { }