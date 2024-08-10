

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
import { AdminEntity } from '../entities/admin.entity';
import { FindChurchAdminDto } from '../dto/find-admin.dto';
import { CreateChurchAdminDto } from '../dto/create-churchadmin.dto';
import { UpdateChurchAdminDto } from '../dto/update-churchadmin.dto';
import { ChurchEntity } from 'src/modules/churches/entities/church.entity';

type Where = Record<string, string | number | boolean>;
@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(AdminEntity)
		private adminRepository: Repository<AdminEntity>,
		@InjectRepository(ChurchEntity)
		private readonly churchRepository: Repository<ChurchEntity>,
	) { }
	private relations: string[] = [];

	async findOneByField(
		fieldValue: number | string,
		fieldName = 'id',
		relations: string[] | boolean = null,
	): Promise<AdminEntity> {
		return await this.adminRepository.findOne({
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
		userAdmin: AdminEntity,
	): Promise<AdminEntity> {
		userAdmin.lastSeen = new Date();
		await this.adminRepository.save(userAdmin);
		return userAdmin;
	}

	async save(
		item: Partial<AdminEntity>,
	): Promise<AdminEntity> {
		return this.adminRepository.save(item);
	}



	async findAllChurchAdmins(
		{
			offset = 0,
			limit = 12,
			sortField,
			sortOrder,
			email,
			//searchQuery,
		}: FindChurchAdminDto = {} as FindChurchAdminDto,
	): Promise<{
		data: AdminEntity[];
		meta: ResultsMetadata;
	}> {
		// -- Filtering
		const where: Where = {};
		if (email) where.email = email;
		// if (organizationId) where.organizationId = organizationId;
		// if (searchQuery) where.name = Like('%' + searchQuery + '%');

		// -- Fetching
		const [data, count] = await this.adminRepository.findAndCount({
			where,
			order: {
				[sortField || 'createdAt']: (sortOrder || 'desc').toUpperCase(),
			},
			skip: offset,
			take: limit,
			relations: ['church']
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
		dto: CreateChurchAdminDto,
	): Promise<AdminEntity> {
		// -- Check if there is a organizationAdmin with the same email
		const existingChurchAdminWithEmail = await this.findOneByField(
			dto.email,
			'email',
		);
		if (existingChurchAdminWithEmail)
			throw new NotAcceptableException(ExceptionEnum.adminEmailTaken);

		// -- Hashing the password: So that they are protected from whoever can access the database.
		const hashedPassword = await bcrypt.hash(
			dto.password,
			CONFIG_PASSWORD_HASH_SALT,
		);

		// -- Save & return the new organizationAdmin
		const churchAdmin = await this.adminRepository.save({
			...dto,
			password: hashedPassword,
		});

		delete churchAdmin.password;
		return churchAdmin;
	}

	async update(
		id: string,
		dto: UpdateChurchAdminDto,
	): Promise<AdminEntity> {
		// -- Check if organizationAdmin exists
		let churchAdmin = await this.findOneByField(id);
		if (!churchAdmin)
			throw new NotFoundException(ExceptionEnum.adminNotFound);

		// --
		churchAdmin = {
			...churchAdmin,
			...dto,
		};
		await this.adminRepository.save(churchAdmin);
		return churchAdmin;
	}

	async remove(id: string): Promise<AdminEntity> {
		// -- Check if organizationAdmin exists
		const churchAdmin = await this.findOneByField(id);
		if (!churchAdmin)
			throw new NotFoundException(ExceptionEnum.adminNotFound);

		// --
		await this.adminRepository.delete(id);
		return churchAdmin;
	}
	async updatePassword(
		dto: UpdatePasswordDto,
		currentUser: AdminEntity,
	): Promise<AdminEntity> {
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
		await this.adminRepository.save(currentUser);

		// --
		delete currentUser.password;
		return currentUser;
	}

	async findAllUsersByChurchId(churchId: string): Promise<AdminEntity[]> {
		// First, check if the church exists
		const church = await this.churchRepository.findOne({ where: { id: churchId } });
		if (!church) {
			throw new NotFoundException(`Church with id ${churchId} not found`);
		}

		// Fetch all church branches for this church
		const admin = await this.adminRepository.find({
			where: { churchId },
			order: {
				createdAt: 'DESC' // Order by creation date, newest first
			}
		});

		return admin;
	}

	async updateChurchStaff(
		id: string,
		dto: UpdateChurchAdminDto
	): Promise<AdminEntity> {
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
		const savedAdmin = await this.adminRepository.save(updatedAdmin);

		// Remove the password from the returned object
		delete savedAdmin.password;

		return savedAdmin;
	}

}