import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ResultsMetadata } from "src/common/models/results-metadata.model";
import { UpdateContactDto } from "../dto/update-subscribe.dto";
import { SubscribeService } from "../services/subscribers.service";
import { SubscriberEntity } from "../entities/subscriber.entity";
import { CreateSubscriberDto } from "../dto/create-subscriber.dto";
import { FindSubscriberDto } from "../dto/find-subscriber.dto";


@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(OrganizationAdminAuthGuard)
@ApiBearerAuth()
@ApiTags('subscribers')
@Controller('subscribers')
export class SubscribeController {
	constructor(private readonly subscribeService: SubscribeService) { }

	@Post()
	@ApiOkResponse({ type: SubscriberEntity })
	async create(@Body() dto: CreateSubscriberDto): Promise<SubscriberEntity> {
		// Check if the email already exists
		const existingSubscriber = await this.subscribeService.findOneByEmail(dto.email);
		if (existingSubscriber) {
			// If email exists, you can handle this according to your application logic
			throw new Error("Email already exists");
		}

		// If email doesn't exist, proceed with creating the subscriber
		return this.subscribeService.create(dto);
	}


	@Get()
	@ApiOkResponse({
		type: () => ({
			data: [SubscriberEntity],
			meta: ResultsMetadata,
		}),
	})
	async find(@Query() dto: FindSubscriberDto): Promise<{
		data: SubscriberEntity[];
		meta: ResultsMetadata;
	}> {
		const subscribers = await this.subscribeService.findAllSubscribers(dto);
		return { data: subscribers, meta: new ResultsMetadata() };
	}

	@Get(':id')
	@ApiOkResponse({ type: SubscriberEntity })
	findOne(@Param('id') id: string): Promise<SubscriberEntity> {
		return this.subscribeService.findOneSubscriber(id);
	}

	@Patch(':id')
	@ApiOkResponse({ type: SubscriberEntity })
	update(
		@Param('id') id: string,
		@Body() dto: UpdateContactDto,
	): Promise<SubscriberEntity> {
		return this.subscribeService.update(id, dto);
	}

	@Delete(':id')
	@ApiOkResponse({ type: SubscriberEntity })
	remove(@Param('id') id: string): Promise<SubscriberEntity> {
		return this.subscribeService.remove(id);
	}
}