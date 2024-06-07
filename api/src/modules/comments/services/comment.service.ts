import { BaseService } from "src/common/services/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { CommentEntity } from "../entities/comment.entity";
import { FindCommentDto } from "../dto/find-comment";
import { CreateCommentDto } from "../dto/create-comment";


export class ContactService extends BaseService<
	CommentEntity,
	FindCommentDto,
	CreateCommentDto
> {
	constructor(
		@InjectRepository(CommentEntity)
		private readonly sermonRepository: Repository<CommentEntity>,
	) {
		super(sermonRepository, ContactService.dtoToFindOptionsWhere, []);
	}

	static dtoToFindOptionsWhere(
		dto: FindCommentDto = {} as FindCommentDto,
	): FindOptionsWhere<CommentEntity> {
		const where: FindOptionsWhere<CommentEntity> = {};
		if (dto.name) where.name = dto.name;
		if (dto.message) where.message = dto.message;
		// Ensure that 'limit', 'skip', and other pagination properties are not included in the query options
		delete dto.limit;

		// You might also want to handle other properties specific to your application

		return Object.keys(where).length ? where : null; // Return null if no filtering criteria are provided
	}
}