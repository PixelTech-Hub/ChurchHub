import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from '../services/admin.service';
import { FindChurchAdminDto } from '../dto/find-admin.dto';
import { AdminEntity } from '../entities/admin.entity';
import { ResultsMetadata } from 'src/common/models/results-metadata.model';
import { CurrentUser } from '../features/auth/decorators/current-user.decorator';
import { ChurchAdminAuthGuard } from '../features/auth/guards/admin.auth.guard';






@Controller('users')
@ApiBearerAuth()
@ApiTags('users')
export class AdminController {
	constructor(private readonly churchAdminService: AdminService) { }

	@Get()
	@UseGuards()
	@ApiOkResponse()
	findAllForAdmins(
		@Query() dto: FindChurchAdminDto,
		@CurrentUser() churchAdmin: AdminEntity,
	): Promise<{
		data: AdminEntity[];
		meta: ResultsMetadata;
	}> {
		if (churchAdmin) {
			dto.churchId = churchAdmin.id;
		}
		return this.churchAdminService.findAllChurchAdmins(dto);
	}

	@Get(':id')
	// @UseGuards(CompanyAdminAuthGuard)
	@ApiOkResponse({ type: AdminEntity })
	findOneForOrganizationAdmins(
		@Param('id') id: string,
	): Promise<AdminEntity> {
		return this.churchAdminService.findOneByField(id);
	}

	@Delete(':id')
	@UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: AdminEntity })
	removeForOrganizationAdmins(
		@Param('id') id: string,
	): Promise<AdminEntity> {
		return this.churchAdminService.remove(id);
	}
}