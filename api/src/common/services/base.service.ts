import { NotFoundException } from '@nestjs/common';
import {
	DeepPartial,
	FindManyOptions,
	FindOneOptions,
	Repository,
} from 'typeorm';

import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { BaseEntity } from '../entities/base.entity';
import { FindDto } from '../dto/find.dto';
import { ResultsMetadata } from '../models/results-metadata.model';
import { ExceptionEnum } from '../enums/exception.enum';

export class BaseService<
	EntityType extends BaseEntity,
	FindDtoType extends FindDto,
	CreateDtoType extends DeepPartial<EntityType>,
> {
	constructor(
		private repository: Repository<EntityType>,
		private dtoToFindOptionsWhere: (
			dto: FindDtoType,
		) => FindOptionsWhere<EntityType> | FindOptionsWhere<EntityType>[],
		private relations: string[] = [],
	) { }

	async find(
		dto: FindDtoType = {} as FindDtoType,
		relations: string[] | boolean = null,
	): Promise<{
		data: EntityType[];
		meta: ResultsMetadata;
	}> {
		// -- Fetching
		const offset = dto.offset || 0;
		const limit = dto.limit || 24;
		const [data, count] = await this.repository.findAndCount({
			where: this.dtoToFindOptionsWhere(dto),
			order: {
				[dto.sortField || 'createdAt']: (dto.sortOrder || 'desc').toUpperCase(),
			},
			skip: offset,
			take: limit,
			...(relations != null
				? {
					relations:
						typeof relations == 'boolean' ? this.relations : relations,
				}
				: {}),
		} as FindManyOptions);

		// Returning
		return {
			data,
			meta: {
				count,
				offset,
				limit,
			},
		};
	}

	async findOne(
		dto: FindDtoType = {} as FindDtoType,
		relations: string[] | boolean = null,
	): Promise<EntityType> {
		return await this.repository.findOne({
			where: this.dtoToFindOptionsWhere(dto),
			...(relations != null
				? {
					relations:
						typeof relations == 'boolean' ? this.relations : relations,
				}
				: {}),
		} as FindOneOptions<EntityType>);
	}

	async findOneById(
		id: string,
		relations: string[] | boolean = null,
	): Promise<EntityType> {
		// relations => in case e need to load some user relations
		return this.findOneByField(id, 'id', relations);
	}

	async findOneByField(
		fieldValue: number | string,
		fieldName = 'id',
		relations: string[] | boolean = null,
	): Promise<EntityType> {
		return await this.repository.findOne({
			where: { [fieldName]: fieldValue },
			...(relations != null
				? {
					relations:
						typeof relations == 'boolean' ? this.relations : relations,
				}
				: {}),
		} as FindOneOptions<EntityType>);
	}

	async create(dto: CreateDtoType): Promise<EntityType> {
		const item = await this.repository.save(dto);
		return this.findOneById(item.id);
	}

	async update(id: string, dto: Partial<CreateDtoType>): Promise<EntityType> {
		// -- Check if main-dashboard exists
		let item = await this.findOneByField(id);
		if (!item) throw new NotFoundException(ExceptionEnum.notFound);

		// --
		item = {
			...item,
			...dto,
		} as EntityType;
		await this.repository.save(item);
		return item;
	}

	async remove(id: string): Promise<EntityType> {
		// -- Check if main-dashboard exists
		const item = await this.findOneByField(id);
		if (!item) throw new NotFoundException(ExceptionEnum.notFound);

		// --
		await this.repository.delete(id);
		return item;
	}
}
