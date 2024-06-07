import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ResultsMetadata } from 'src/common/models/results-metadata.model';
import { ChurchAdminAuthGuard } from 'src/modules/admins/features/auth/guards/admin.auth.guard';
import { ChurchServiceEntity } from '../entities/church-service.entity';
import { CreateChurchServiceDto } from '../dto/create-church-service.dto';
import { FindChurchServiceDto } from '../dto/find-church-service.dto';
import { ChurchService } from '../services/church-services.service';
import { UpdateChurchServiceDto } from '../dto/update-branch.dto';






@Controller('church_services')
// @ApiBearerAuth()
@ApiTags('church_services')
export class ChurchServiceController {
	constructor(private readonly churchService: ChurchService) { }

	@Post()
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: ChurchServiceEntity })
	create(@Body() dto: CreateChurchServiceDto): Promise<ChurchServiceEntity> {
		return this.churchService.create(dto);
	}


	@Get()
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({
		type: () => ({
			data: [ChurchServiceEntity],
			meta: ResultsMetadata,
		}),
	})
	async find(@Query() dto: FindChurchServiceDto): Promise<{
		data: ChurchServiceEntity[];
		meta: ResultsMetadata;
	}> {
		const branches = await this.churchService.findAllChurchServices(dto);
		return { data: branches, meta: new ResultsMetadata() };
	}

	@Get(':id')
	@ApiOkResponse({ type: ChurchServiceEntity })
	findOne(@Param('id') id: string): Promise<ChurchServiceEntity> {
		return this.churchService.findOneChurchService(id);
	}

	@Patch(':id')
	@UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: ChurchServiceEntity })
	update(
		@Param('id') id: string,
		@Body() dto: UpdateChurchServiceDto,
	): Promise<ChurchServiceEntity> {
		return this.churchService.update(id, dto);
	}

	@Delete(':id')
	@UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: ChurchServiceEntity })
	remove(@Param('id') id: string): Promise<ChurchServiceEntity> {
		return this.churchService.remove(id);
	}
}