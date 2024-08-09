import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ResultsMetadata } from 'src/common/models/results-metadata.model';
import { CurrentUser } from '../features/auth/decorators/current-user.decorator';
import { ChurchAdminAuthGuard } from '../features/auth/guards/admin.auth.guard';
import { SystemAdminService } from '../services/system_admin.service';
import { SystemAdminEntity } from '../entities/system_admin.entity';
import { FindSystemAdminDto } from '../dto/find-system-admin.dto';
import { JwtAuthGuard } from 'src/modules/admins/features/auth/guards/jwt-auth.guard';
import { UpdateSystemAdminDto } from '../dto/update-system-admin.dto';






@Controller('system_admin')
@ApiBearerAuth()
@ApiTags('System Admins')
export class SystemAdminController {
	constructor(private readonly systemAdminService: SystemAdminService) { }

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiOkResponse()
	findAllForAdmins(
		@Query() dto: FindSystemAdminDto,
		@CurrentUser() systemAdmin: SystemAdminEntity,
	): Promise<{
		data: SystemAdminEntity[];
		meta: ResultsMetadata;
	}> {
		return this.systemAdminService.findAllSystemAdmins(dto);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOkResponse({ type: SystemAdminEntity })
	findOneForOrganizationAdmins(
		@Param('id') id: string,
	): Promise<SystemAdminEntity> {
		return this.systemAdminService.findOneByField(id);
	}


	@Patch(':id')
	async updateAdmin(
		@Param('id') id: string,
		@Body() updateAdminDto: UpdateSystemAdminDto
	) {
		return this.systemAdminService.updateAdmin(id, updateAdminDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: SystemAdminEntity })
	removeForOrganizationAdmins(
		@Param('id') id: string,
	): Promise<SystemAdminEntity> {
		return this.systemAdminService.remove(id);
	}
}