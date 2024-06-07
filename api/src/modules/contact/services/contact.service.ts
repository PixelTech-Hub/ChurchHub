import { BaseService } from "src/common/services/base.service";
import { ContactEntity } from "../entities/contact.entity";
import { FindContactDto } from "../dto/find-contact";
import { CreateContactDto } from "../dto/create-contact";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";


export class ContactService extends BaseService <
ContactEntity,
FindContactDto,
CreateContactDto
> {
	constructor(
		@InjectRepository(ContactEntity)
		private readonly contactRepository: Repository<ContactEntity>,
	) {
		super(contactRepository, ContactService.dtoToFindOptionsWhere, []);
	}

static dtoToFindOptionsWhere(
		dto: FindContactDto = {} as FindContactDto,
	): FindOptionsWhere<ContactEntity> {
		const where: FindOptionsWhere<ContactEntity> = {};
		if (dto.name) where.name = dto.name;
		if (dto.email) where.email = dto.email;
		if (dto.telephone) where.telephone = dto.telephone;
		if (dto.subject) where.subject = dto.subject;
		if (dto.message) where.message = dto.message;
		// Ensure that 'limit', 'skip', and other pagination properties are not included in the query options
		delete dto.limit;

		// You might also want to handle other properties specific to your application

		return Object.keys(where).length ? where : null; // Return null if no filtering criteria are provided
	}

	async findAllContacts(dto: FindContactDto): Promise<ContactEntity[]> {
		return this.contactRepository.find({ relations: ['church'] });
	}

	async findOneChurchBranch(id: string): Promise<ContactEntity> {
		const churchRole = await this.contactRepository.findOne({ where: { id }, relations: ['church'] });
		if (!churchRole) {
			throw new NotFoundException('Church Role not found');
		}
		return churchRole;
	}
}

