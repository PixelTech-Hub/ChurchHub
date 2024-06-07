import { BaseService } from "src/common/services/base.service";
import { SermonEntity } from "../entities/sermon.entity";
import { FindSermonDto } from "../dto/find-sermon";
import { CreateSermonDto } from "../dto/create-sermon";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";


export class SermonService extends BaseService<
	SermonEntity,
	FindSermonDto,
	CreateSermonDto
> {
	constructor(
		@InjectRepository(SermonEntity)
		private readonly sermonRepository: Repository<SermonEntity>,
	) {
		super(sermonRepository, SermonService.dtoToFindOptionsWhere, []);
	}

	static dtoToFindOptionsWhere(
		dto: FindSermonDto = {} as FindSermonDto,
	): FindOptionsWhere<SermonEntity> {
		const where: FindOptionsWhere<SermonEntity> = {};
		if (dto.name) where.name = dto.name;
		if (dto.pastor) where.pastor = dto.pastor;
		if (dto.link) where.link = dto.link;
		// Ensure that 'limit', 'skip', and other pagination properties are not included in the query options
		delete dto.limit;

		// You might also want to handle other properties specific to your application

		return Object.keys(where).length ? where : null; // Return null if no filtering criteria are provided
	}
	async findAllSermons(dto: FindSermonDto): Promise<SermonEntity[]> {
		return this.sermonRepository.find({ relations: ['church'] });
	}

	async findOneSermon(id: string): Promise<SermonEntity> {
		const churchRole = await this.sermonRepository.findOne({ where: { id }, relations: ['church'] });
		if (!churchRole) {
			throw new NotFoundException('Church Sermon not found');
		}
		return churchRole;
	}
}