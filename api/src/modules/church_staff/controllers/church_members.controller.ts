import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { ChurchStaffService } from "../services/church_staff.service";
import { ChurchStaffEntity } from "../entities/church_staff.entity";
import { CreateChurchStaffDto } from "../dto/create-churchstaff.dto";
import { UpdateChurchStaffDto } from "../dto/update-churchmember.dto";
import { ResultsMetadata } from "src/common/models/results-metadata.model";
import { FindChurchStaffDto } from "../dto/find-churchstaff.dto";

@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(OrganizationAdminAuthGuard)
@ApiBearerAuth()
@ApiTags('Church Staff')
@Controller('church-staffs')
export class ChurchStaffController {
	constructor(private readonly churchStaffService: ChurchStaffService) { }


	@Post()
	@ApiOkResponse({ type: ChurchStaffEntity })
	async create(@Body() createChurchMemberDto: CreateChurchStaffDto): Promise<ChurchStaffEntity> {
		return this.churchStaffService.create(createChurchMemberDto);
	}

	@Get()
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({
		type: () => ({
			data: [ChurchStaffEntity],
			meta: ResultsMetadata,
		}),
	})
	async find (@Query() dto: FindChurchStaffDto): Promise<{
		data: ChurchStaffEntity[];
		meta: ResultsMetadata;
	}> {
		const branches = await this.churchStaffService.findAllChurchBranch(dto);
		return { data: branches, meta: new ResultsMetadata() };
	}

	@Get(':id')
	@ApiOkResponse({ type: ChurchStaffEntity })
	findOne(@Param('id') id: string): Promise<ChurchStaffEntity> {
		return this.churchStaffService.findOneChurchBranch(id);
	}

	@Patch(':id')
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: ChurchStaffEntity })
	update(
		@Param('id') id: string,
		@Body() dto: UpdateChurchStaffDto,
	): Promise<ChurchStaffEntity> {
		return this.churchStaffService.update(id, dto);
	}

	@Delete(':id')
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({ type: ChurchStaffEntity })
	remove(@Param('id') id: string): Promise<ChurchStaffEntity> {
		return this.churchStaffService.remove(id);
	}




}