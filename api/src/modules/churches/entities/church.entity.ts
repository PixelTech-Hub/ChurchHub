import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { AccountEntity } from "src/modules/account/entities/account.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity('churches')
export class ChurchEntity extends BaseEntity {
	@ApiProperty()
	@Column({ nullable: true })
	isEnabled: Boolean

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	name: String

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	website: String

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	email: String


	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	office_no: String

	@ApiProperty()
	@IsString()
	@Column({ nullable: true, length: 300 })
	vision: String

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	mission: String

	@ApiProperty()
	@Column('text')
	core_values: String

	@OneToOne(() => AccountEntity, account => account.churchId)
	account: AccountEntity[];

}