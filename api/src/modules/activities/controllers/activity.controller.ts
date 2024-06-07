import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ResultsMetadata } from 'src/common/models/results-metadata.model';
import { ActivityService } from '../services/activity.service';
import { ActivityEntity } from '../entities/activity.entity';
import { CreateActivityDto } from '../dto/create-activity.dto';






@Controller('activities')
// @ApiBearerAuth()
@ApiTags('activities')
export class ActivityController {
	constructor(private readonly activityService: ActivityService) { }

	@Post()
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: ActivityEntity })
	create(@Body() dto: CreateActivityDto): Promise<ActivityEntity> {
		return this.activityService.create(dto);
	}



}