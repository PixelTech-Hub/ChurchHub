import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { EventsService } from "../services/events.service";
import { EventsEntity } from "../entities/events.entity";
import { CreateEventDto } from "../dto/create-event";
import { ResultsMetadata } from "src/common/models/results-metadata.model";
import { FindEventsDto } from "../dto/find-event";
import { UpdateEventDto } from "../dto/update-event";


@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(OrganizationAdminAuthGuard)
@ApiBearerAuth()
@ApiTags('upcoming-events')
@Controller('upcoming-events')
export class EventsController {
	constructor(private readonly eventsService: EventsService) { }

	@Post()
	@ApiOkResponse({ type: EventsEntity })
	create(@Body() dto: CreateEventDto): Promise<EventsEntity> {
		return this.eventsService.create(dto);
	}


	@Get()
	@ApiOkResponse({
		type: () => ({
			data: [EventsEntity],
			meta: ResultsMetadata,
		}),
	})
	async find(@Query() dto: FindEventsDto): Promise<{
		data: EventsEntity[];
		meta: ResultsMetadata;
	}> {
		const events = await this.eventsService.findAllUpcomingEvents(dto);
		return { data: events, meta: new ResultsMetadata() };
	}

	@Get(':id')
	@ApiOkResponse({ type: EventsEntity })
	findOne(@Param('id') id: string): Promise<EventsEntity> {
		return this.eventsService.findOneUpcomingEvent(id);
	}

	@Patch(':id')
	@ApiOkResponse({ type: EventsEntity })
	update(
		@Param('id') id: string,
		@Body() dto: UpdateEventDto,
	): Promise<EventsEntity> {
		return this.eventsService.update(id, dto);
	}

	@Delete(':id')
	@ApiOkResponse({ type: EventsEntity })
	remove(@Param('id') id: string): Promise<EventsEntity> {
		return this.eventsService.remove(id);
	}
}