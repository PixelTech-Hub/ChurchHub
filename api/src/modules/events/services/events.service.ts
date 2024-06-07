import { BaseService } from "src/common/services/base.service";
import { EventsEntity } from "../entities/events.entity";
import { FindEventsDto } from "../dto/find-event";
import { CreateEventDto } from "../dto/create-event";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";


export class EventsService extends BaseService<
	EventsEntity,
	FindEventsDto,
	CreateEventDto
> {
	constructor(
		@InjectRepository(EventsEntity)
		private readonly eventRepository: Repository<EventsEntity>,
	) {
		super(eventRepository, EventsService.dtoToFindOptionsWhere, []);
	}

	static dtoToFindOptionsWhere(
		dto: FindEventsDto = {} as FindEventsDto,
	): FindOptionsWhere<EventsEntity> {
		const where: FindOptionsWhere<EventsEntity> = {};
		if (dto.name) where.name = dto.name;
		if (dto.category) where.category = dto.category;
		if (dto.message) where.message = dto.message;
		if (dto.event_date) where.event_date = dto.event_date;
		if (dto.image) where.image = dto.image;
		// Ensure that 'limit', 'skip', and other pagination properties are not included in the query options
		delete dto.limit;

		// You might also want to handle other properties specific to your application

		return Object.keys(where).length ? where : null; // Return null if no filtering criteria are provided
	}
	async findAllUpcomingEvents(dto: FindEventsDto): Promise<EventsEntity[]> {
		return this.eventRepository.find({ relations: ['church'] });
	}

	async findOneUpcomingEvent(id: string): Promise<EventsEntity> {
		const churchRole = await this.eventRepository.findOne({ where: { id }, relations: ['church'] });
		if (!churchRole) {
			throw new NotFoundException('Church Event not found');
		}
		return churchRole;
	}
}