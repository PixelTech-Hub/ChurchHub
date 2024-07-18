import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
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
	@ApiOperation({ summary: 'Create a new church' })
	@ApiOkResponse({ type: ChurchMemberEntity })
	async create(@Body() createChurchMemberDto: CreateChurchMemberDto): Promise<ChurchMemberEntity> {
		return this.churchMemberService.createMember(createChurchMemberDto);
	}

	@Get()
	@ApiOperation({ summary: 'Get all church members for all churches' })
	@ApiOkResponse({ type: [ChurchMemberEntity] })
	async findAll(@Query() query: FindChurchMemberDto): Promise<ChurchMemberEntity[]> {
		return this.churchMemberService.findAll();
	}

	@Get('church/:churchId')
	@ApiOperation({ summary: 'Get all members of a specific church' })
	@ApiParam({ name: 'churchId', required: true, description: 'ID of the church' })
	@ApiResponse({ status: 200, description: 'Returns all members of the specified church', type: [ChurchMemberEntity] })
	@ApiResponse({ status: 404, description: 'Church not found' })
	async getMembersByChurchId(@Param('churchId') churchId: string): Promise<ChurchMemberEntity[]> {
		try {
			const members = await this.churchMemberService.findMembersByChurchId(churchId);
			return members;
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw new NotFoundException(error.message);
			}
			throw error;
		}
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a member by memberId' })
	@ApiParam({ name: 'memberId', required: true, description: 'ID of the church member' })
	@ApiOkResponse({ type: ChurchMemberEntity })
	findOne(@Param('id') id: string): Promise<ChurchMemberEntity> {
		return this.churchMemberService.findOneMember(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update a member by memberId' })
	@ApiOkResponse({ type: ChurchMemberEntity })
	update(
		@Param('id') id: string,
		@Body() dto: UpdateChurchMemberDto,
	): Promise<ChurchMemberEntity> {
		return this.churchMemberService.updateChurchMember(id, dto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a member by memberId' })
	@ApiOkResponse({ type: ChurchMemberEntity })
	remove(@Param('id') id: string): Promise<ChurchMemberEntity> {
		return this.churchMemberService.removeChurchMember(id);
	}




}