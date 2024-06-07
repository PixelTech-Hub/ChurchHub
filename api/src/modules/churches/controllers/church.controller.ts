import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ChurchEntity } from '../entities/church.entity';
import { CreateChurchDto } from '../dto/create-church.dto';
import { ResultsMetadata } from 'src/common/models/results-metadata.model';
import { FindChurchDto } from '../dto/find-church.dto';
import { UpdateChurchDto } from '../dto/update-churchadmin.dto';
import { ChurchAdminAuthGuard } from 'src/modules/admins/features/auth/guards/admin.auth.guard';
import { ChurchService } from '../services/church.service';
import { AccountService } from 'src/modules/account/services/account.service';
import { AccountEntity } from 'src/modules/account/entities/account.entity';






@Controller('churches')
// @ApiBearerAuth()
@ApiTags('churches')
export class ChurchController {
	constructor(private readonly churchService: ChurchService, private readonly accountService: AccountService) { }

	@Post()
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: ChurchEntity })
	async create(@Body() dto: CreateChurchDto): Promise<{ church: ChurchEntity; account: AccountEntity }> {

		const church = await this.churchService.create(dto);

		if (church) {
			// Create an account for the church
			const account = await this.accountService.create({
				churchId: church.id,
				balance: '0'
			});

			// Return both the church and account entities
			return { church, account };
		} else {
			// Handle the case where church creation failed
			throw new Error("Failed to create church");
		}
	}

	@Get()
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({
		type: () => ({
			data: [ChurchEntity],
			meta: ResultsMetadata,
		}),
	})
	find(@Query() dto: FindChurchDto): Promise<{
		data: ChurchEntity[];
		meta: ResultsMetadata;
	}> {
		return this.churchService.find(dto);
	}

	@Get(':id')
	@ApiOkResponse({ type: ChurchEntity })
	findOne(@Param('id') id: string): Promise<ChurchEntity> {
		return this.churchService.findOneByField(id);
	}

	@Patch(':id')
	@UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: ChurchEntity })
	update(
		@Param('id') id: string,
		@Body() dto: UpdateChurchDto,
	): Promise<ChurchEntity> {
		return this.churchService.update(id, dto);
	}

	@Delete(':id')
	@UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: ChurchEntity })
	remove(@Param('id') id: string): Promise<ChurchEntity> {
		return this.churchService.remove(id);
	}
}