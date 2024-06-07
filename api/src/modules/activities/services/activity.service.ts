import { BaseService } from "src/common/services/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateActivityDto } from "../dto/create-activity.dto";
import { FindActivityDto } from "../dto/find-activity.dto";
import { ActivityEntity } from "../entities/activity.entity";


export class ActivityService extends BaseService<
	ActivityEntity,
	FindActivityDto,
	CreateActivityDto
> {
	constructor(
		@InjectRepository(ActivityEntity)
		private readonly activityRepository: Repository<ActivityEntity>,
	) {
		super(activityRepository, ActivityService.dtoToFindOptionsWhere, []);
	}

	static dtoToFindOptionsWhere(
		dto: FindActivityDto = {} as FindActivityDto,
	): FindOptionsWhere<ActivityEntity> {
		const where: FindOptionsWhere<ActivityEntity> = {};
		if (dto.name) where.name = dto.name;
		if (dto.churchBranchId) where.churchBranchId = dto.churchBranchId;
		// Ensure that 'limit', 'skip', and other pagination properties are not included in the query options
		delete dto.limit;

		// You might also want to handle other properties specific to your application

		return Object.keys(where).length ? where : null; // Return null if no filtering criteria are provided
	}
	async findAllActivities(dto: FindActivityDto): Promise<ActivityEntity[]> {
		return this.activityRepository.find({ relations: ['main_church', 'church_branch'] });
	}
}