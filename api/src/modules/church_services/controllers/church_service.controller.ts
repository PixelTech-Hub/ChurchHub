import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
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
	@ApiOperation({ summary: 'Post a new service for a specific church' })
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: ChurchServiceEntity })
	create(@Body() dto: CreateChurchServiceDto): Promise<ChurchServiceEntity> {
		return this.churchService.create(dto);
	}


	@Get()
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOperation({ summary: 'Get all services for all churches' })
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

	@Get('church/:churchId')
	@ApiOperation({ summary: 'Get all services of a specific church' })
	@ApiParam({ 
		name: 'churchId', 
		required: true, 
		description: 'ID of the church' 
	})
	@ApiResponse({ 
		status: 200, 
		description: 'Returns all services of the specified church', 
		type: [ChurchServiceEntity] 
	})
	@ApiResponse({ 
		status: 404, 
		description: 'Church Service not found' 
	})
	async getServicesByChurchId(@Param('churchId') churchId: string): Promise<ChurchServiceEntity[]> {
		try {
			const services = await this.churchService.findAllServicesByChurchId(churchId);
			return services;
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw new NotFoundException(error.message);
			}
			throw error;
		}
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get one services by serviceId' })
	@ApiParam({ name: 'serviceId', required: true, description: 'ID of the service' })
	@ApiOkResponse({ status: 200, description: 'Returns a specific service by its id',  type: ChurchServiceEntity })
	findOne(@Param('id') id: string): Promise<ChurchServiceEntity> {
		return this.churchService.findOneChurchService(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Get all services of a specific church' })
	@ApiParam({ name: 'churchId', required: true, description: 'ID of the church' })
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: ChurchServiceEntity })
	update(
		@Param('id') id: string,
		@Body() dto: UpdateChurchServiceDto,
	): Promise<ChurchServiceEntity> {
		return this.churchService.update(id, dto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete church service by its ID' })
	@ApiParam({ name: 'serviceId', required: true, description: 'ID of the service' })
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: ChurchServiceEntity })
	remove(@Param('id') id: string): Promise<ChurchServiceEntity> {
		return this.churchService.remove(id);
	}
}