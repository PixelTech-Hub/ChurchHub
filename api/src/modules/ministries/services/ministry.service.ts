import { BaseService } from "src/common/services/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateMinistryDto } from "../dto/create-ministry.dto";
import { FindMinistryDto } from "../dto/find-ministry.dto";
import { NotFoundException } from "@nestjs/common";
import { MinistryEntity } from "../entities/ministry.entity";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";
import { ChurchStaffEntity } from "src/modules/church_staff/entities/church_staff.entity";


export class ChurchMinistryService extends BaseService<
	MinistryEntity,
	FindMinistryDto,
	CreateMinistryDto
> {
	constructor(
		@InjectRepository(MinistryEntity)
		private readonly ministryRepository: Repository<MinistryEntity>,
		@InjectRepository(ChurchEntity)
		private readonly churchRepository: Repository<ChurchEntity>,
		@InjectRepository(ChurchStaffEntity)
		private readonly staffRepository: Repository<ChurchStaffEntity>,
	) {
		super(ministryRepository, ChurchMinistryService.dtoToFindOptionsWhere, []);
	}

	static dtoToFindOptionsWhere(
		dto: FindMinistryDto = {} as FindMinistryDto,
	): FindOptionsWhere<MinistryEntity> {
		const where: FindOptionsWhere<MinistryEntity> = {};
		if (dto.name) where.name = dto.name;
		// Ensure that 'limit', 'skip', and other pagination properties are not included in the query options
		delete dto.limit;

		// You might also want to handle other properties specific to your application

		return Object.keys(where).length ? where : null; // Return null if no filtering criteria are provided
	}

	async createMinistry(dto: CreateMinistryDto): Promise<MinistryEntity> {
		// First, check if a ministry with the same name already exists for the given church
		const existingMinistry = await this.ministryRepository.findOne({
			where: {
				name: dto.name,
				churchId: dto.churchId
			}
		});

		if (existingMinistry) {
			throw new NotFoundException(`Church ministry  with id ${dto.name} already exist`);
		}

		// Check if the church exists
		const church = await this.churchRepository.findOne({ where: { id: dto.churchId } });
		if (!church) {
			throw new NotFoundException(`Church with id ${dto.churchId} not found`);
		}


		// Create and save the new ministry
		// If both checks pass, create the saving group
		return this.create(dto);
	}

	async findAllChurchMinistries(dto: FindMinistryDto): Promise<MinistryEntity[]> {
		return this.ministryRepository.find({ relations: ['church'] });
	}

	async findAllChurchMinistriesByChurchId(churchId: string): Promise<MinistryEntity[]> {
		// First, check if the church exists
		const church = await this.churchRepository.findOne({ where: { id: churchId } });
		if (!church) {
			throw new NotFoundException(`Church with id ${churchId} not found`);
		}

		// Fetch all ministries for this church
		const ministry = await this.ministryRepository.find({
			where: { churchId },
			order: {
				createdAt: 'DESC' // Order by creation date, newest first
			},
			relations: ['leader']
		});

		return ministry;
	}

	async findOneChurchMinistry(id: string): Promise<MinistryEntity> {
		const churchRole = await this.ministryRepository.findOne({ where: { id }, relations: ['church'] });
		if (!churchRole) {
			throw new NotFoundException('Church Role not found');
		}
		return churchRole;
	}
}