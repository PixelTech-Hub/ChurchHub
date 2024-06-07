import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ContactService } from "../services/comment.service";
import { ResultsMetadata } from "src/common/models/results-metadata.model";
import { CommentEntity } from "../entities/comment.entity";
import { CreateCommentDto } from "../dto/create-comment";
import { FindCommentDto } from "../dto/find-comment";
import { UpdateCommentDto } from "../dto/update-comment";


@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(OrganizationAdminAuthGuard)
@ApiBearerAuth()
@ApiTags('comments')
@Controller('comments')
export class CommentController {
	constructor(private readonly contactService: ContactService) { }

	@Post()
	@ApiOkResponse({ type: CommentEntity })
	create(@Body() dto: CreateCommentDto): Promise<CommentEntity> {
		return this.contactService.create(dto);
	}


	@Get()
	@ApiOkResponse({
		type: () => ({
			data: [CommentEntity],
			meta: ResultsMetadata,
		}),
	})
	find(@Query() dto: FindCommentDto): Promise<{
		data: CommentEntity[];
		meta: ResultsMetadata;
	}> {
		return this.contactService.find(dto);
	}

	@Get(':id')
	@ApiOkResponse({ type: CommentEntity })
	findOne(@Param('id') id: string): Promise<CommentEntity> {
		return this.contactService.findOneByField(id);
	}

	@Patch(':id')
	@ApiOkResponse({ type: CommentEntity })
	update(
		@Param('id') id: string,
		@Body() dto: UpdateCommentDto,
	): Promise<CommentEntity> {
		return this.contactService.update(id, dto);
	}

	@Delete(':id')
	@ApiOkResponse({ type: CommentEntity })
	remove(@Param('id') id: string): Promise<CommentEntity> {
		return this.contactService.remove(id);
	}
}