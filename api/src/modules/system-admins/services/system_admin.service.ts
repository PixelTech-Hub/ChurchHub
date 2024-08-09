

import {
	Injectable, NotAcceptableException, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExceptionEnum } from 'src/common/enums/exception.enum';
import * as bcrypt from 'bcrypt';
import { CONFIG_PASSWORD_HASH_SALT } from 'src/config/app.config';
import { ResultsMetadata } from 'src/common/models/results-metadata.model';
import { UpdatePasswordDto } from 'src/common/dto/update-password.dto';
import { SystemAdminEntity } from '../entities/system_admin.entity';
import { FindSystemAdminDto } from '../dto/find-system-admin.dto';
import { CreateSystemAdminDto } from '../dto/create-system-admin.dto';
import { UpdateSystemAdminDto } from '../dto/update-system-admin.dto';

type Where = Record<string, string | number | boolean>;
@Injectable()
export class SystemAdminService {
	constructor(
		@InjectRepository(SystemAdminEntity)
		private systemAdminRepository: Repository<SystemAdminEntity>,
	) { }
	private relations: string[] = [];

	async findOneByField(
		fieldValue: number | string,
		fieldName = 'id',
		relations: string[] | boolean = null,
	): Promise<SystemAdminEntity> {
		return await this.systemAdminRepository.findOne({
			where: { [fieldName]: fieldValue },
			...(relations != null
				? {
					relations:
						typeof relations == 'boolean' ? this.relations : relations,
				}
				: {}),
		});
	}

	async updateLastSeenAt(
		systemAdmin: SystemAdminEntity,
	): Promise<SystemAdminEntity> {
		systemAdmin.lastSeen = new Date();
		await this.systemAdminRepository.save(systemAdmin);
		return systemAdmin;
	}

	async save(
		item: Partial<SystemAdminEntity>,
	): Promise<SystemAdminEntity> {
		return this.systemAdminRepository.save(item);
	}



	async findAllSystemAdmins(
		{
			offset = 0,
			limit = 12,
			sortField,
			sortOrder,
			email,
			//searchQuery,
		}: FindSystemAdminDto = {} as FindSystemAdminDto,
	): Promise<{
		data: SystemAdminEntity[];
		meta: ResultsMetadata;
	}> {
		// -- Filtering
		const where: Where = {};
		if (email) where.email = email;
		// if (organizationId) where.organizationId = organizationId;
		// if (searchQuery) where.name = Like('%' + searchQuery + '%');

		// -- Fetching
		const [data, count] = await this.systemAdminRepository.findAndCount({
			where,
			order: {
				[sortField || 'createdAt']: (sortOrder || 'desc').toUpperCase(),
			},
			skip: offset,
			take: limit,
		});

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

	async create(
		dto: CreateSystemAdminDto,
	): Promise<SystemAdminEntity> {
		// -- Check if there is a organizationAdmin with the same email
		const existingSystemAdmin = await this.findOneByField(
			dto.email,
			'email',
		);
		if (existingSystemAdmin)
			throw new NotAcceptableException(ExceptionEnum.adminEmailTaken);

		// -- Hashing the password: So that they are protected from whoever can access the database.
		const hashedPassword = await bcrypt.hash(
			dto.password,
			CONFIG_PASSWORD_HASH_SALT,
		);

		// -- Save & return the new organizationAdmin
		const systemAdmin = await this.systemAdminRepository.save({
			...dto,
			password: hashedPassword,
		});

		delete systemAdmin.password;
		return systemAdmin;
	}

	async update(
		id: string,
		dto: UpdateSystemAdminDto,
	): Promise<SystemAdminEntity> {
		// -- Check if systemAdmin exists
		let systemAdmin = await this.findOneByField(id);
		if (!systemAdmin)
			throw new NotFoundException(ExceptionEnum.adminNotFound);

		// --
		systemAdmin = {
			...systemAdmin,
			...dto,
		};
		await this.systemAdminRepository.save(systemAdmin);
		return systemAdmin;
	}

	async remove(id: string): Promise<SystemAdminEntity> {
		// -- Check if organizationAdmin exists
		const systemAdmin = await this.findOneByField(id);
		if (!systemAdmin)
			throw new NotFoundException(ExceptionEnum.adminNotFound);

		// --
		await this.systemAdminRepository.delete(id);
		return systemAdmin;
	}
	async updatePassword(
		dto: UpdatePasswordDto,
		currentUser: SystemAdminEntity,
	): Promise<SystemAdminEntity> {
		// -- Verify
		if (
			!(await bcrypt.compare(
				dto.currentPassword,
				currentUser.password,
			))
		)
			throw new NotAcceptableException(ExceptionEnum.passwordIncorrect);

		// -- Set verification to true & Update otp
		const hashedPassword = await bcrypt.hash(
			dto.newPassword,
			CONFIG_PASSWORD_HASH_SALT,
		);
		currentUser = {
			...currentUser,
			password: hashedPassword,
		};
		await this.systemAdminRepository.save(currentUser);

		// --
		delete currentUser.password;
		return currentUser;
	}

	async updateAdmin(
		id: string,
		dto: UpdateSystemAdminDto
	): Promise<SystemAdminEntity> {
		// Check if the admin exists
		const existingAdmin = await this.findOneByField(id);
		if (!existingAdmin) {
			throw new NotFoundException(ExceptionEnum.adminNotFound);
		}

		// Update the admin
		const updatedAdmin = {
			...existingAdmin,
			...dto,
		};

		// Save the updated admin
		const savedAdmin = await this.systemAdminRepository.save(updatedAdmin);

		// Remove the password from the returned object
		delete savedAdmin.password;

		return savedAdmin;
	}

}