import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { InsightsService } from '../services/insights.service';
import { InsightEntity } from '../entities/insights.entity';
import { CreateInsightDto } from '../dto/create-insight';
import { ResultsMetadata } from 'src/common/models/results-metadata.model';
import { FindInsightsDto } from '../dto/find-insight';
import { UpdateInsightsDto } from '../dto/update-insight';

@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(OrganizationAdminAuthGuard)
@ApiBearerAuth()
@ApiTags('insights')
@Controller('insights')
export class InsightsController {
	constructor(private readonly insightService: InsightsService) { }

	@Post()
	@ApiOkResponse({ type: InsightEntity })
	create(@Body() dto: CreateInsightDto): Promise<InsightEntity> {
		return this.insightService.create(dto);
	}

	@Get()
	@ApiOkResponse({
		type: () => ({
			data: [InsightEntity],
			meta: ResultsMetadata,
		}),
	})
	@ApiQuery({ type: FindInsightsDto })
	async find(@Query() dto: FindInsightsDto): Promise<{
		data: InsightEntity[];
		meta: ResultsMetadata;
	}> {
		const insights = await this.insightService.findAllInsights(dto);
		return { data: insights, meta: new ResultsMetadata() };
	}


	@Get(':id')
	@ApiOkResponse({ type: InsightEntity })
	findOne(@Param('id') id: string): Promise<InsightEntity> {
		return this.insightService.findOneInsight(id);
	}

	@Patch(':id')
	@ApiOkResponse({ type: InsightEntity })
	update(
		@Param('id') id: string,
		@Body() dto: UpdateInsightsDto,
	): Promise<InsightEntity> {
		return this.insightService.update(id, dto);
	}

	@Delete(':id')
	@ApiOkResponse({ type: InsightEntity })
	remove(@Param('id') id: string): Promise<InsightEntity> {
		return this.insightService.remove(id);
	}
}
