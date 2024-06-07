import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsightEntity } from './entities/insights.entity';
import { InsightsController } from './controllers/insights.controller';
import { InsightsService } from './services/insights.service';

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([InsightEntity])],
	controllers: [InsightsController],
	providers: [InsightsService],
	exports: [TypeOrmModule],
})

export class InsightsModules { }