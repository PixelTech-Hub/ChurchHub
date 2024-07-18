import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateChurchMemberDto } from '../dto/create-churchmember.dto';
import { ChurchMemberEntity } from '../entities/church_members.entity';
import { FindChurchMemberDto } from '../dto/find-churchmember.dto';
import { BaseService } from 'src/common/services/base.service';
import { UpdateChurchMemberDto } from '../dto/update-churchmember.dto';
import { MinistryEntity } from 'src/modules/ministries/entities/ministry.entity';
import { ChurchEntity } from 'src/modules/churches/entities/church.entity';

@Injectable()
export class ChurchMemberService {
	constructor(
		@InjectRepository(ChurchMemberEntity)
		private readonly churchMemberRepository: Repository<ChurchMemberEntity>,
		@InjectRepository(MinistryEntity)
		private readonly churchMinistryRepository: Repository<MinistryEntity>,
		@InjectRepository(ChurchEntity)
		private readonly churchRepository: Repository<ChurchEntity>,
	) { }




	async createMember(createChurchMemberDto: CreateChurchMemberDto): Promise<ChurchMemberEntity> {
		// Check if the church with the provided churchId exists
		const church = await this.churchRepository.findOne({ where: { id: createChurchMemberDto.churchId } });

		if (!church) {
			throw new NotFoundException(`Church with id ${createChurchMemberDto.churchId} not found`);
		}
		// Check if the ministries with the provided IDs exist
		const ministries = await this.churchMinistryRepository.findByIds(createChurchMemberDto.church_ministries_ids);
		if (!ministries || ministries.length !== createChurchMemberDto.church_ministries_ids.length) {
			throw new NotFoundException('One or more church ministries not found');
		}

		// Create the church member entity
		const churchMember = this.churchMemberRepository.create(createChurchMemberDto);

		// Set the ministries relation
		churchMember.ministries = ministries;

		// Save the church member entity
		return this.churchMemberRepository.save(churchMember);
	}
	async findAll(): Promise<ChurchMemberEntity[]> {
		return this.churchMemberRepository.find({
			relations: ['ministries', 'church'],
			order: {
				createdAt: "DESC"
			}
		});
	}
	async findMembersByChurchId(churchId: string): Promise<ChurchMemberEntity[]> {
		// First, check if the church exists
		const church = await this.churchRepository.findOne({ where: { id: churchId } });
		if (!church) {
			throw new NotFoundException(`Church with id ${churchId} not found`);
		}

		// Fetch all members for this church
		const members = await this.churchMemberRepository.find({
			where: { churchId },
			relations: ['ministries'], // Include related ministries if needed
			order: {
				createdAt: 'DESC' // Order by creation date, newest first
			}
		});

		return members;
	}
	async findOneMember(id: string): Promise<ChurchMemberEntity> {
		const churchMember = await this.churchMemberRepository.findOne({ where: { id }, relations: ['ministries'] });
		if (!churchMember) {
			throw new NotFoundException('Church member not found');
		}
		return churchMember;
	}

	async updateChurchMember(id: string, updateChurchMemberDto: UpdateChurchMemberDto): Promise<ChurchMemberEntity> {
		const existingMember = await this.churchMemberRepository.findOne({
			where: { id }
		});
		if (!existingMember) {
			throw new NotFoundException('Church member not found');
		}

		const updatedMember = Object.assign(existingMember, updateChurchMemberDto);
		return this.churchMemberRepository.save(updatedMember);
	}

	async removeChurchMember(id: string): Promise<ChurchMemberEntity> {
		// Check if the church member with the provided id exists
		const churchMember = await this.churchMemberRepository.findOne({ where: { id } });
		if (!churchMember) {
			throw new NotFoundException('Church member not found');
		}

		// Delete the church member
		const deletedChurchMember = await this.churchMemberRepository.remove(churchMember);
		return deletedChurchMember;
	}


}
