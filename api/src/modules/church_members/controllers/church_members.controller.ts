import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { ResultsMetadata } from "src/common/models/results-metadata.model";
import { ChurchMemberEntity } from "../entities/church_members.entity";
import { CreateChurchMemberDto } from "../dto/create-churchmember.dto";
import { UpdateChurchMemberDto } from "../dto/update-churchmember.dto";
import { FindChurchMemberDto } from "../dto/find-churchmember.dto";
import { ChurchMemberService } from "../services/church_member.service";

@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(OrganizationAdminAuthGuard)
@ApiBearerAuth()
@ApiTags('Church Members')
@Controller('church-members')
export class ChurchMemberController {
	constructor(private readonly churchMemberService: ChurchMemberService) { }


	@Post()
	@ApiOkResponse({ type: ChurchMemberEntity })
	async create(@Body() createChurchMemberDto: CreateChurchMemberDto): Promise<ChurchMemberEntity> {
		return this.churchMemberService.createMember(createChurchMemberDto);
	}

	@Get()
	@ApiOkResponse({ type: [ChurchMemberEntity] })
	async findAll(@Query() query: FindChurchMemberDto): Promise<ChurchMemberEntity[]> {
		return this.churchMemberService.findAll();
	}

	@Get(':id')
	@ApiOkResponse({ type: ChurchMemberEntity })
	findOne(@Param('id') id: string): Promise<ChurchMemberEntity> {
		return this.churchMemberService.findOneMember(id);
	}

	@Patch(':id')
	@ApiOkResponse({ type: ChurchMemberEntity })
	update(
		@Param('id') id: string,
		@Body() dto: UpdateChurchMemberDto,
	): Promise<ChurchMemberEntity> {
		return this.churchMemberService.updateChurchMember(id, dto);
	}

	@Delete(':id')
	@ApiOkResponse({ type: ChurchMemberEntity })
	remove(@Param('id') id: string): Promise<ChurchMemberEntity> {
		return this.churchMemberService.removeChurchMember(id);
	}

	


}