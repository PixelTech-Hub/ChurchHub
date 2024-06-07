import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ResultsMetadata } from 'src/common/models/results-metadata.model';
import { UpdateChurchDto } from '../dto/update-branch.dto';
import { ChurchAdminAuthGuard } from 'src/modules/admins/features/auth/guards/admin.auth.guard';
import { BranchService } from '../services/branch.service';
import { BranchEntity } from '../entities/branch.entity';
import { FindBranchDto } from '../dto/find-branch.dto';
import { CreateBranchDto } from '../dto/create-branch.dto';






@Controller('church_branches')
// @ApiBearerAuth()
@ApiTags('church_branches')
export class BranchController {
	constructor(private readonly branchService: BranchService) { }

	@Post()
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: BranchEntity })
	create(@Body() dto: CreateBranchDto): Promise<BranchEntity> {
		return this.branchService.create(dto);
	}


	@Get()
	// @UseGuards(ChurchAdminAuthGuard)
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

	@Get(':id')
	@ApiOkResponse({ type: BranchEntity })
	findOne(@Param('id') id: string): Promise<BranchEntity> {
		return this.branchService.findOneChurchBranch(id);
	}

	@Patch(':id')
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: BranchEntity })
	update(
		@Param('id') id: string,
		@Body() dto: UpdateChurchDto,
	): Promise<BranchEntity> {
		return this.branchService.update(id, dto);
	}

	@Delete(':id')
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: BranchEntity })
	remove(@Param('id') id: string): Promise<BranchEntity> {
		return this.branchService.remove(id);
	}
}