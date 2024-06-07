import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ContactEntity } from "../entities/contact.entity";
import { CreateContactDto } from "../dto/create-contact";
import { ContactService } from "../services/contact.service";
import { ResultsMetadata } from "src/common/models/results-metadata.model";
import { FindContactDto } from "../dto/find-contact";
import { UpdateContactDto } from "../dto/update-contact";


@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(OrganizationAdminAuthGuard)
@ApiBearerAuth()
@ApiTags('contact')
@Controller('contact')
export class ContactController {
	constructor(private readonly contactService: ContactService) { }

	@Post()
	@ApiOkResponse({ type: ContactEntity })
	create(@Body() dto: CreateContactDto): Promise<ContactEntity> {
		return this.contactService.create(dto);
	}


	@Get()
	@ApiOkResponse({
		type: () => ({
			data: [ContactEntity],
			meta: ResultsMetadata,
		}),
	})
	async find(@Query() dto: FindContactDto): Promise<{
		data: ContactEntity[];
		meta: ResultsMetadata;
	}> {
		const contacts = await this.contactService.findAllContacts(dto);
		return { data: contacts, meta: new ResultsMetadata() };
	}

	@Get(':id')
	@ApiOkResponse({ type: ContactEntity })
	findOne(@Param('id') id: string): Promise<ContactEntity> {
		return this.contactService.findOneByField(id);
	}

	@Patch(':id')
	@ApiOkResponse({ type: ContactEntity })
	update(
		@Param('id') id: string,
		@Body() dto: UpdateContactDto,
	): Promise<ContactEntity> {
		return this.contactService.update(id, dto);
	}

	@Delete(':id')
	@ApiOkResponse({ type: ContactEntity })
	remove(@Param('id') id: string): Promise<ContactEntity> {
		return this.contactService.remove(id);
	}
}