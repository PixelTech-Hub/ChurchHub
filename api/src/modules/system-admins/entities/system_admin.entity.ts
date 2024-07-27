import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { EntitySystemAdminRoleEnum } from "../enums/system_admin.enum";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";

@Entity('admins')
export class SystemAdminEntity extends BaseEntity {
	@ApiProperty()
	@Column({ nullable: true })
	lastSeen: Date

	@ApiProperty()
	@Column({ nullable: true })
	isEnabled: Boolean


	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar' })
	name: String

	@ApiProperty()
	@IsEmail()
	@Column({ type: 'varchar' })
	email: String

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar' })
	password: String

	@ApiProperty()
	@Column({ type: 'varchar', default: true })
	isEmailVerified: String

	@IsDefined()
	@IsNotEmpty()
	@Column({ nullable: true })
	@IsEnum(EntitySystemAdminRoleEnum, { message: 'Invalid system admin role' })
	role: EntitySystemAdminRoleEnum;

}