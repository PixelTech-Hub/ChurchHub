import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ResultsMetadata } from 'src/common/models/results-metadata.model';
import { UpdateChurchDto } from '../dto/update-branch.dto';
import { ChurchAdminAuthGuard } from 'src/modules/admins/features/auth/guards/admin.auth.guard';
import { BranchService } from '../services/branch.service';
import { BranchEntity } from '../entities/branch.entity';
import { FindBranchDto } from '../dto/find-branch.dto';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { JwtAuthGuard } from 'src/modules/admins/features/auth/guards/jwt-auth.guard';






@Controller('church_branches')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) 
@ApiTags('church_branches')
export class BranchController {
	constructor(private readonly branchService: BranchService) { }

	@Post()
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOperation({ summary: 'Post a new church branche for by church Id' })
	@ApiOkResponse({ type: BranchEntity })
	create(@Body() dto: CreateBranchDto): Promise<BranchEntity> {
		return this.branchService.create(dto);
	}


	@Get()
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOperation({ summary: 'Get all branches' })
	@ApiOkResponse({
		type: () => ({
			data: [BranchEntity],
			meta: ResultsMetadata,
		}),
	})
	async find (@Query() dto: FindBranchDto): Promise<{
		data: BranchEntity[];
		meta: ResultsMetadata;
	}> {
		const branches = await this.branchService.findAllChurchBranch(dto);
		return { data: branches, meta: new ResultsMetadata() };
	}

	@Get('church/:churchId')
	@ApiOperation({ summary: 'Get all branches of a specific church' })
	@ApiParam({ 
		name: 'churchId', 
		required: true, 
		description: 'ID of the church' 
	})
	@ApiResponse({ 
		status: 200, 
		description: 'Returns all branches of the specified church', 
		type: [BranchEntity] 
	})
	@ApiResponse({ 
		status: 404, 
		description: 'Church branches not found' 
	})
	async getBranchesByChurchId(@Param('churchId') mainChurchId: string): Promise<BranchEntity[]> {
		try {
			const branches = await this.branchService.findAllBranchesByChurchId(mainChurchId);
			return branches;
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw new NotFoundException(error.message);
			}
			throw error;
		}
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a branch by specific church branch id' })
	@ApiParam({ 
		name: 'branchId', 
		required: true, 
		description: 'ID of the church branch' 
	})
	@ApiOkResponse({ type: BranchEntity })
	findOne(@Param('id') id: string): Promise<BranchEntity> {
		return this.branchService.findOneChurchBranch(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update a branche by specific church branch id' })
	@ApiParam({ 
		name: 'branchId', 
		required: true, 
		description: 'ID of the church branch' 
	})
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: BranchEntity })
	update(
		@Param('id') id: string,
		@Body() dto: UpdateChurchDto,
	): Promise<BranchEntity> {
		return this.branchService.update(id, dto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a branche by specific church branch id' })
	@ApiParam({ 
		name: 'branchId', 
		required: true, 
		description: 'ID of the church branch' 
	})
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: BranchEntity })
	remove(@Param('id') id: string): Promise<BranchEntity> {
		return this.branchService.remove(id);
	}
}