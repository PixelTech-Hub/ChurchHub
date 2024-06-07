import { BaseService } from "src/common/services/base.service";
import { FindSubscriberDto } from "../dto/find-subscriber.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { SubscriberEntity } from "../entities/subscriber.entity";
import { CreateSubscriberDto } from "../dto/create-subscriber.dto";
import { NotFoundException } from "@nestjs/common";


export class SubscribeService extends BaseService<
	SubscriberEntity,
	FindSubscriberDto,
	CreateSubscriberDto
> {
	constructor(
		@InjectRepository(SubscriberEntity)
		private readonly subscribeRepository: Repository<SubscriberEntity>,
	) {
		super(subscribeRepository, SubscribeService.dtoToFindOptionsWhere, []);
	}

	static dtoToFindOptionsWhere(
		dto: FindSubscriberDto = {} as FindSubscriberDto,
	): FindOptionsWhere<SubscriberEntity> {
		const where: FindOptionsWhere<SubscriberEntity> = {};
		if (dto.email) where.email = dto.email;
		// Ensure that 'limit', 'skip', and other pagination properties are not included in the query options
		delete dto.limit;

		// You might also want to handle other properties specific to your application

		return Object.keys(where).length ? where : null; // Return null if no filtering criteria are provided
	}

	async findOneByEmail(email: string): Promise<SubscriberEntity> {
		return this.subscribeRepository.findOne({ where: { email } });
	}
	async findAllSubscribers(dto: FindSubscriberDto): Promise<SubscriberEntity[]> {
		return this.subscribeRepository.find({ relations: ['church'] });
	}

	async findOneSubscriber(id: string): Promise<SubscriberEntity> {
		const churchRole = await this.subscribeRepository.findOne({ where: { id }, relations: ['church'] });
		if (!churchRole) {
			throw new NotFoundException('Church Sermon not found');
		}
		return churchRole;
	}

}