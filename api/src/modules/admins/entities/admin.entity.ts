import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { EntityChurchAdminRoleEnum } from "../enums/admin.enum";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";
import { Exclude } from "class-transformer";

@Entity('users')
export class AdminEntity extends BaseEntity {
	@ApiProperty()
	@Column({ nullable: true })
	lastSeen: Date

	@ApiProperty()
	@Column({ nullable: true })
	isEnabled: Boolean

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar' })
	churchId: String

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar' })
	name: string

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar' })
	title: string



	@ApiProperty()
	@IsEmail()
	@Column({ type: 'varchar' })
	email: string

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar' })
	password: string

	@ApiProperty()
	@Column({ type: 'varchar', default: true })
	isEmailVerified: Boolean

	@IsDefined()
	@IsNotEmpty()
	@Column({ nullable: true })
	@IsEnum(EntityChurchAdminRoleEnum, { message: 'Invalid church admin role' })
	role: EntityChurchAdminRoleEnum;

	@Exclude()
	@Column({ type: 'int', nullable: true })
	otp: number;

	@Exclude()
	@Column({ nullable: true })
	otpExpiresAt: Date;

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar' })
	contact: string

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar' })
	dob: string

	@Exclude()
    @Column({ type: 'varchar', nullable: true })
    resetToken: string | null;

	@ApiProperty()
	@ManyToOne(() => ChurchEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'churchId' })
	church: Partial<ChurchEntity>;
}