import { BaseService } from "src/common/services/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { ChurchEntity } from "../entities/church.entity";
import { FindChurchDto } from "../dto/find-church.dto";
import { CreateChurchDto } from "../dto/create-church.dto";


export class ChurchService extends BaseService<
	ChurchEntity,
	FindChurchDto,
	CreateChurchDto
> {
	constructor(
		@InjectRepository(ChurchEntity)
		private readonly churchRepository: Repository<ChurchEntity>,
	) {
		super(churchRepository, ChurchService.dtoToFindOptionsWhere, []);
	}

	static dtoToFindOptionsWhere(
		dto: FindChurchDto = {} as FindChurchDto,
	): FindOptionsWhere<ChurchEntity> {
		const where: FindOptionsWhere<ChurchEntity> = {};
		if (dto.name) where.name = dto.name;
		if (dto.email) where.email = dto.email;
		if (dto.office_no) where.office_no = dto.office_no;
		if (dto.website) where.website = dto.website;
		// Ensure that 'limit', 'skip', and other pagination properties are not included in the query options
		delete dto.limit;

		// You might also want to handle other properties specific to your application

		return Object.keys(where).length ? where : null; // Return null if no filtering criteria are provided
	}
}