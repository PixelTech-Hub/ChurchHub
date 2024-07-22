import { BaseService } from "src/common/services/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { ChurchServiceEntity } from "../entities/church-service.entity";
import { CreateChurchServiceDto } from "../dto/create-church-service.dto";
import { FindChurchServiceDto } from "../dto/find-church-service.dto";
import { NotFoundException } from "@nestjs/common";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";


export class ChurchService extends BaseService<
	ChurchServiceEntity,
	FindChurchServiceDto,
	CreateChurchServiceDto
> {
	constructor(
		@InjectRepository(ChurchServiceEntity)
		private readonly churchServiceRepository: Repository<ChurchServiceEntity>,
		@InjectRepository(ChurchEntity)
		private readonly churchRepository: Repository<ChurchEntity>,
		
	) {
		super(churchServiceRepository, ChurchService.dtoToFindOptionsWhere, []);
	}

	static dtoToFindOptionsWhere(
		dto: FindChurchServiceDto = {} as FindChurchServiceDto,
	): FindOptionsWhere<ChurchServiceEntity> {
		const where: FindOptionsWhere<ChurchServiceEntity> = {};
		if (dto.name) where.name = dto.name;
		if (dto.churchId) where.churchId = dto.churchId;
		// Ensure that 'limit', 'skip', and other pagination properties are not included in the query options
		delete dto.limit;

		// You might also want to handle other properties specific to your application

		return Object.keys(where).length ? where : null; // Return null if no filtering criteria are provided
	}
	async findAllChurchServices(dto: FindChurchServiceDto): Promise<ChurchServiceEntity[]> {
		return this.churchServiceRepository.find({ relations: ['church'] });
	}
	async findAllServicesByChurchId(churchId: string): Promise<ChurchServiceEntity[]> {
		// First, check if the church exists
		const church = await this.churchRepository.findOne({ where: { id: churchId } });
		if (!church) {
			throw new NotFoundException(`Church with id ${churchId} not found`);
		}

		// Fetch all church services for this church
		const services = await this.churchServiceRepository.find({
			where: { churchId },
			order: {
				createdAt: 'DESC' // Order by creation date, newest first
			}
		});

		return services;
	}

	async findOneChurchService(id: string): Promise<ChurchServiceEntity> {
		const churchRole = await this.churchServiceRepository.findOne({ where: { id }, relations: ['church'] });
		if (!churchRole) {
			throw new NotFoundException('Church Role not found');
		}
		return churchRole;
	}
}