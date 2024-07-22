import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDefined, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { EntityAgeEnum } from "src/common/enums/entity-age.enum";
import { EntityEducationalLevelEnum } from "src/common/enums/entity-education.enum";
import { EntityGenderEnum } from "src/common/enums/entity-gender.enum";
import { EntityMaritalStatusEnum } from "src/common/enums/entity-maritalstatus.enum";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";
import { MinistryEntity } from "src/modules/ministries/entities/ministry.entity";
import { TransactionEntity } from "src/modules/transactions/entities/transactions.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity('church_staffs')
export class ChurchStaffEntity extends BaseEntity {
	@ApiProperty()
	@IsString()
	@Column()
	churchId: string;

	@ApiProperty()
	@IsString()
	@Column()
	first_name: string;

	@ApiProperty()
	@IsString()
	@Column()
	last_name: string;

	@ApiProperty()
	@IsString()
	@Column()
	position: string;

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
	@IsString()
	@Column()
	dob: string;

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
	@IsBoolean()
	@Column({ default: false })
	disability: boolean;


	@ApiProperty()
	// @IsPhoneNumber()
	@IsString()
	@Column({ type: 'varchar' })
	phone_number: string;

	@ApiProperty()
	@IsEmail()
	@Column()
	email: string;

	@ApiProperty()
	@IsString()
	@Column()
	account_name: string;

	@ApiProperty()
	@IsString()
	@Column()
	account_no: string;

	@ApiProperty()
	@IsString()
	@Column()
	residence: string;

	@ApiProperty()
	@IsString()
	@Column()
	baptised: boolean;

	@ApiProperty()
	@IsString()
	@Column()
	career: string;

	// @OneToMany(() => TransactionEntity, (transaction) => transaction.staff)
	// transactions: Partial<TransactionEntity>[]

	@ApiProperty()
	@ManyToOne(() => MinistryEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'position' })
	ministryId: Partial<MinistryEntity>;

	@ApiProperty()
	@ManyToOne(() => ChurchEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'churchId' })
	church: Partial<ChurchEntity>;
}