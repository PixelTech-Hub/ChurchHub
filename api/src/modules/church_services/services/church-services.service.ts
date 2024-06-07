import { BaseService } from "src/common/services/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { ChurchServiceEntity } from "../entities/church-service.entity";
import { CreateChurchServiceDto } from "../dto/create-church-service.dto";
import { FindChurchServiceDto } from "../dto/find-church-service.dto";
import { NotFoundException } from "@nestjs/common";


export class ChurchService extends BaseService<
	ChurchServiceEntity,
	FindChurchServiceDto,
	CreateChurchServiceDto
> {
	constructor(
		@InjectRepository(ChurchServiceEntity)
		private readonly branchRepository: Repository<ChurchServiceEntity>,
	) {
		super(branchRepository, ChurchService.dtoToFindOptionsWhere, []);
	}

	static dtoToFindOptionsWhere(
		dto: FindChurchServiceDto = {} as FindChurchServiceDto,
	): FindOptionsWhere<ChurchServiceEntity> {
		const where: FindOptionsWhere<ChurchServiceEntity> = {};
		if (dto.name) where.name = dto.name;
		// Ensure that 'limit', 'skip', and other pagination properties are not included in the query options
		delete dto.limit;

		// You might also want to handle other properties specific to your application

		return Object.keys(where).length ? where : null; // Return null if no filtering criteria are provided
	}
	async findAllChurchServices(dto: FindChurchServiceDto): Promise<ChurchServiceEntity[]> {
		return this.branchRepository.find({ relations: ['church'] });
	}

	async findOneChurchService(id: string): Promise<ChurchServiceEntity> {
		const churchRole = await this.branchRepository.findOne({ where: { id }, relations: ['church'] });
		if (!churchRole) {
			throw new NotFoundException('Church Role not found');
		}
		return churchRole;
	}
}