import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { SermonService } from "../services/sermon.service";
import { SermonEntity } from "../entities/sermon.entity";
import { CreateSermonDto } from "../dto/create-sermon";
import { ResultsMetadata } from "src/common/models/results-metadata.model";
import { FindSermonDto } from "../dto/find-sermon";
import { UpdateSermonDto } from "../dto/update-sermon";

@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(OrganizationAdminAuthGuard)
@ApiBearerAuth()
@ApiTags('sermons')
@Controller('sermons')
export class SermonController {
	constructor(private readonly sermonService: SermonService) { }

	@Post()
	@ApiOkResponse({ type: SermonEntity })
	create(@Body() dto: CreateSermonDto): Promise<SermonEntity> {
		return this.sermonService.create(dto);
	}


	@Get()
	@ApiOkResponse({
		type: () => ({
			data: [SermonEntity],
			meta: ResultsMetadata,
		}),
	})
	async find(@Query() dto: FindSermonDto): Promise<{
		data: SermonEntity[];
		meta: ResultsMetadata;
	}> {
		const sermons = await this.sermonService.findAllSermons(dto);
		return { data: sermons, meta: new ResultsMetadata() };
	}

	@Get(':id')
	@ApiOkResponse({ type: SermonEntity })
	findOne(@Param('id') id: string): Promise<SermonEntity> {
		return this.sermonService.findOneSermon(id);
	}

	@Patch(':id')
	@ApiOkResponse({ type: SermonEntity })
	update(
		@Param('id') id: string,
		@Body() dto: UpdateSermonDto,
	): Promise<SermonEntity> {
		return this.sermonService.update(id, dto);
	}

	@Delete(':id')
	@ApiOkResponse({ type: SermonEntity })
	remove(@Param('id') id: string): Promise<SermonEntity> {
		return this.sermonService.remove(id);
	}
}