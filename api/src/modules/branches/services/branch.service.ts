import { BaseService } from "src/common/services/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { BranchEntity } from "../entities/branch.entity";
import { CreateBranchDto } from "../dto/create-branch.dto";
import { FindBranchDto } from "../dto/find-branch.dto";
import { NotFoundException } from "@nestjs/common";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";


export class BranchService extends BaseService<
	BranchEntity,
	FindBranchDto,
	CreateBranchDto
> {
	constructor(
		@InjectRepository(BranchEntity)
		private readonly branchRepository: Repository<BranchEntity>,
		@InjectRepository(ChurchEntity)
		private readonly churchRepository: Repository<ChurchEntity>,
	) {
		super(branchRepository, BranchService.dtoToFindOptionsWhere, []);
	}

	static dtoToFindOptionsWhere(
		dto: FindBranchDto = {} as FindBranchDto,
	): FindOptionsWhere<BranchEntity> {
		const where: FindOptionsWhere<BranchEntity> = {};
		if (dto.name) where.name = dto.name;
		if (dto.email) where.email = dto.email;
		// Ensure that 'limit', 'skip', and other pagination properties are not included in the query options
		delete dto.limit;

		// You might also want to handle other properties specific to your application

		return Object.keys(where).length ? where : null; // Return null if no filtering criteria are provided
	}
	async findAllChurchBranch(dto: FindBranchDto): Promise<BranchEntity[]> {
		return this.branchRepository.find({ relations: ['main_church'] });
	}

	async findAllBranchesByChurchId(mainChurchId: string): Promise<BranchEntity[]> {
		// First, check if the church exists
		const church = await this.churchRepository.findOne({ where: { id: mainChurchId } });
		if (!church) {
			throw new NotFoundException(`Church with id ${mainChurchId} not found`);
		}

		// Fetch all church branches for this church
		const branches = await this.branchRepository.find({
			where: { mainChurchId },
			order: {
				createdAt: 'DESC' // Order by creation date, newest first
			}
		});

		return branches;
	}

	async findOneChurchBranch(id: string): Promise<BranchEntity> {
		const churchRole = await this.branchRepository.findOne({ where: { id }, relations: ['main_church'] });
		if (!churchRole) {
			throw new NotFoundException('Church Branch not found');
		}
		return churchRole;
	}
}