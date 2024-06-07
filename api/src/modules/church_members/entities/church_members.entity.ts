import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { EntityAgeEnum } from "src/common/enums/entity-age.enum";
import { EntityEducationalLevelEnum } from "src/common/enums/entity-education.enum";
import { EntityGenderEnum } from "src/common/enums/entity-gender.enum";
import { EntityMaritalStatusEnum } from "src/common/enums/entity-maritalstatus.enum";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";
import { MinistryEntity } from "src/modules/ministries/entities/ministry.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity('church_members')
export class ChurchMemberEntity extends BaseEntity {
	@ApiProperty()
	@IsString()
	@Column()
	churchId: string;

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 250 })
	full_name: string;

	@ApiProperty({
		enum: EntityGenderEnum,
		enumName: 'Gender',
	})
	@IsDefined()
	@IsNotEmpty()
	@Column({ nullable: true })
	@IsEnum(EntityGenderEnum, { message: 'Please select a gender' })
	gender: EntityGenderEnum;

	@ApiProperty()
	@IsPhoneNumber()
	@Column({ type: 'varchar', length: 100 })
	phone_number: string;

	@ApiProperty()
	@IsPhoneNumber()
	@Column({ type: 'varchar', length: 100 })
	whatsapp_number: string;

	@ApiProperty()
	@IsEmail()
	@Column()
	email: string;

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 200 })
	job: string;

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 100 })
	residence: string;

	@ApiProperty({
		enum: EntityAgeEnum,
		enumName: 'Age',
	})
	@IsDefined()
	@IsNotEmpty()
	@Column({ nullable: true })
	@IsEnum(EntityAgeEnum, { message: 'Please select your age range' })
	age: EntityAgeEnum;

	@ApiProperty({
		enum: EntityMaritalStatusEnum,
		enumName: 'Marital Status',
	})
	@IsDefined()
	@IsNotEmpty()
	@Column({ nullable: true })
	@IsEnum(EntityMaritalStatusEnum, { message: 'Please select your marital status' })
	marital_status: EntityMaritalStatusEnum;

	@ApiProperty()
	@IsNumber()
	@Column()
	no_of_children: number;

	@ApiProperty({
		enum: EntityEducationalLevelEnum,
		enumName: 'Educational Level',
	})
	@IsDefined()
	@IsNotEmpty()
	@Column({ nullable: true })
	@IsEnum(EntityEducationalLevelEnum, { message: 'Please select your educational level' })
	education_level: EntityEducationalLevelEnum;


	@OneToMany((type) => MinistryEntity, ministry => ministry.church_members)
	ministries: MinistryEntity[];


	@ApiProperty()
	@ManyToOne(() => ChurchEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'churchId' })
	church: Partial<ChurchEntity>;
}