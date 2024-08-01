import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AdminService } from '../services/admin.service';
import { FindChurchAdminDto } from '../dto/find-admin.dto';
import { AdminEntity } from '../entities/admin.entity';
import { ResultsMetadata } from 'src/common/models/results-metadata.model';
import { CurrentUser } from '../features/auth/decorators/current-user.decorator';
import { ChurchAdminAuthGuard } from '../features/auth/guards/admin.auth.guard';
import { JwtAuthGuard } from '../features/auth/guards/jwt-auth.guard';






@Controller('users')
@ApiBearerAuth()
@ApiTags('users')
export class AdminController {
	constructor(private readonly churchAdminService: AdminService) { }

	@Get()
	@UseGuards(JwtAuthGuard)
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

	@Get('church/:churchId')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get all admins of a specific church' })
	@ApiParam({ 
		name: 'churchId', 
		required: true, 
		description: 'ID of the church' 
	})
	@ApiResponse({ 
		status: 200, 
		description: 'Returns all branches of the specified church', 
		type: [AdminEntity] 
	})
	@ApiResponse({ 
		status: 404, 
		description: 'Church branches not found' 
	})
	async getUsersByChurchId(@Param('churchId') mainChurchId: string): Promise<AdminEntity[]> {
		try {
			const branches = await this.churchAdminService.findAllUsersByChurchId(mainChurchId);
			return branches;
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw new NotFoundException(error.message);
			}
			throw error;
		}
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@ApiOkResponse({ type: AdminEntity })
	findOneForOrganizationAdmins(
		@Param('id') id: string,
	): Promise<AdminEntity> {
		return this.churchAdminService.findOneByField(id);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: AdminEntity })
	removeForOrganizationAdmins(
		@Param('id') id: string,
	): Promise<AdminEntity> {
		return this.churchAdminService.remove(id);
	}
}