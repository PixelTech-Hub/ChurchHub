import { BaseService } from "src/common/services/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { ChurchStaffEntity } from "../entities/church_staff.entity";
import { FindChurchStaffDto } from "../dto/find-churchstaff.dto";
import { CreateChurchStaffDto } from "../dto/create-churchstaff.dto";
import { MinistryEntity } from "src/modules/ministries/entities/ministry.entity";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";


export class ChurchStaffService extends BaseService<
	ChurchStaffEntity,
	FindChurchStaffDto,
	CreateChurchStaffDto
> {
	constructor(
		@InjectRepository(ChurchStaffEntity)
		private readonly staffRepository: Repository<ChurchStaffEntity>,
		@InjectRepository(MinistryEntity)
		private readonly ministryRepository: Repository<MinistryEntity>,
		@InjectRepository(ChurchEntity)
		private readonly churchRepository: Repository<ChurchEntity>,
	) {
		super(staffRepository, ChurchStaffService.dtoToFindOptionsWhere, []);
	}

	static dtoToFindOptionsWhere(
		dto: FindChurchStaffDto = {} as FindChurchStaffDto,
	): FindOptionsWhere<ChurchStaffEntity> {
		const where: FindOptionsWhere<ChurchStaffEntity> = {};
		if (dto.first_name) where.first_name = dto.first_name;
		if (dto.churchId) where.churchId = dto.churchId;
		if (dto.email) where.email = dto.email;
		if (dto.career) where.career = dto.career;
		// Ensure that 'limit', 'skip', and other pagination properties are not included in the query options
		delete dto.limit;

		// You might also want to handle other properties specific to your application

		return Object.keys(where).length ? where : null; // Return null if no filtering criteria are provided
	}
	async createNewStaff(dto: CreateChurchStaffDto): Promise<ChurchStaffEntity> {
		// First, check for the existing emails
		const existingEmail = await this.staffRepository.findOne({
			where: {
				email: dto.email,
			}
		});

		if (existingEmail) {
			throw new NotFoundException(`Email already with id ${dto.email} exist`);
		}
		// First, check if a ministry with the same name already exists for the given church
		const existingMinistry = await this.ministryRepository.findOne({
			where: {
				name: dto.position,
				churchId: dto.churchId
			}
		});

		if (!existingMinistry) {
			throw new NotFoundException(`Church ministry  with id ${dto.position} not found`);
		}

		// Check if the church exists
		const church = await this.churchRepository.findOne({ where: { id: dto.churchId } });
		if (!church) {
			throw new NotFoundException(`Church with id ${dto.churchId} not found`);
		}


		// Create and save the new ministry
		// If both checks pass, create a new staff
		return this.create(dto);
	}
	async findAllChurchBranch(dto: FindChurchStaffDto): Promise<ChurchStaffEntity[]> {
		return this.staffRepository.find({ relations: ['church'] });
	}

	async findOneChurchBranch(id: string): Promise<ChurchStaffEntity> {
		const churchStaff = await this.staffRepository.findOne({ where: { id }, relations: ['church'] });
		if (!churchStaff) {
			throw new NotFoundException('Church Staff not found');
		}
		return churchStaff;
	}
}