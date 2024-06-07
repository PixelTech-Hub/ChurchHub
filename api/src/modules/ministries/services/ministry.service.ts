import { BaseService } from "src/common/services/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateMinistryDto } from "../dto/create-ministry.dto";
import { FindMinistryDto } from "../dto/find-ministry.dto";
import { NotFoundException } from "@nestjs/common";
import { MinistryEntity } from "../entities/ministry.entity";


export class ChurchMinistryService extends BaseService<
	MinistryEntity,
	FindMinistryDto,
	CreateMinistryDto
> {
	constructor(
		@InjectRepository(MinistryEntity)
		private readonly ministryRepository: Repository<MinistryEntity>,
	) {
		super(ministryRepository, ChurchMinistryService.dtoToFindOptionsWhere, []);
	}

	static dtoToFindOptionsWhere(
		dto: FindMinistryDto = {} as FindMinistryDto,
	): FindOptionsWhere<MinistryEntity> {
		const where: FindOptionsWhere<MinistryEntity> = {};
		if (dto.name) where.name = dto.name;
		if (dto.leader) where.leader = dto.leader;
		// Ensure that 'limit', 'skip', and other pagination properties are not included in the query options
		delete dto.limit;

		// You might also want to handle other properties specific to your application

		return Object.keys(where).length ? where : null; // Return null if no filtering criteria are provided
	}
	async findAllChurchMinistries(dto: FindMinistryDto): Promise<MinistryEntity[]> {
		return this.ministryRepository.find({ relations: ['church'] });
	}

	async findOneChurchMinistry(id: string): Promise<MinistryEntity> {
		const churchRole = await this.ministryRepository.findOne({ where: { id }, relations: ['church'] });
		if (!churchRole) {
			throw new NotFoundException('Church Role not found');
		}
		return churchRole;
	}
}