import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ResultsMetadata } from 'src/common/models/results-metadata.model'
import { ChurchMinistryService } from '../services/ministry.service';
import { MinistryEntity } from '../entities/ministry.entity';
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
	@ApiOperation({ summary: 'Create a new church ministry' })
	@ApiOkResponse({ type: MinistryEntity })
	create(@Body() dto: CreateMinistryDto): Promise<MinistryEntity> {
		return this.ministryService.createMinistry(dto);
	}



	@Get()
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOperation({ summary: 'Get all church ministries' })
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

	@Get('church/:churchId')
	@ApiOperation({ summary: 'Get all ministries of a specific church' })
	@ApiParam({ name: 'churchId', required: true, description: 'ID of the church' })
	@ApiResponse({
		status: 200,
		description: 'Returns all members of the specified church',
		type: [MinistryEntity]
	})
	@ApiResponse({ status: 404, description: 'Church not found' })
	async getMinistriesByChurchId(@Param('churchId') churchId: string): Promise<MinistryEntity[]> {
		try {
			const members = await this.ministryService.findAllChurchMinistriesByChurchId(churchId);
			return members;
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw new NotFoundException(error.message);
			}
			throw error;
		}
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get church ministry by Id' })
	@ApiParam({ name: 'ministryId', required: true, description: 'ID of the ministry' })
	@ApiOkResponse({ type: MinistryEntity })
	findOne(@Param('id') id: string): Promise<MinistryEntity> {
		return this.ministryService.findOneChurchMinistry(id);
	}

	@Patch(':id')
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOperation({ summary: 'Update church ministry by ministryId' })
	@ApiParam({ name: 'ministryId', required: true, description: 'ID of the ministry' })
	@ApiOkResponse({ type: MinistryEntity })
	update(
		@Param('id') id: string,
		@Body() dto: UpdateMinistryDto,
	): Promise<MinistryEntity> {
		return this.ministryService.update(id, dto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Update church ministry by ministryId' })
	@ApiParam({ name: 'ministryId', required: true, description: 'ID of the ministry' })
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: MinistryEntity })
	remove(@Param('id') id: string): Promise<MinistryEntity> {
		return this.ministryService.remove(id);
	}
}