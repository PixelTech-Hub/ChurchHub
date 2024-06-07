import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ResultsMetadata } from 'src/common/models/results-metadata.model'
import { ChurchMinistryService } from '../services/ministry.service';
import { MinistryEntity } from '../entities/ministry.entity';
import { ChurchAdminAuthGuard } from 'src/modules/admins/features/auth/guards/admin.auth.guard';
import { UpdateMinistryDto } from '../dto/update-ministry.dto';
import { FindMinistryDto } from '../dto/find-ministry.dto';
import { CreateMinistryDto } from '../dto/create-ministry.dto';






@Controller('church_ministries')
// @ApiBearerAuth()
@ApiTags('church_ministries')
export class MinistryController {
	constructor(private readonly ministryService: ChurchMinistryService) { }

	@Post()
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: MinistryEntity })
	create(@Body() dto: CreateMinistryDto): Promise<MinistryEntity> {
		return this.ministryService.create(dto);
	}


	@Get()
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({
		type: () => ({
			data: [MinistryEntity],
			meta: ResultsMetadata,
		}),
	})
	async find(@Query() dto: FindMinistryDto): Promise<{
		data: MinistryEntity[];
		meta: ResultsMetadata;
	}> {
		const branches = await this.ministryService.findAllChurchMinistries(dto);
		return { data: branches, meta: new ResultsMetadata() };
	}

	@Get(':id')
	@ApiOkResponse({ type: MinistryEntity })
	findOne(@Param('id') id: string): Promise<MinistryEntity> {
		return this.ministryService.findOneChurchMinistry(id);
	}

	@Patch(':id')
	@UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: MinistryEntity })
	update(
		@Param('id') id: string,
		@Body() dto: UpdateMinistryDto,
	): Promise<MinistryEntity> {
		return this.ministryService.update(id, dto);
	}

	@Delete(':id')
	@UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: MinistryEntity })
	remove(@Param('id') id: string): Promise<MinistryEntity> {
		return this.ministryService.remove(id);
	}
}