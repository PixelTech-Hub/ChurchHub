import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('church_branches')
export class BranchEntity extends BaseEntity {

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	mainChurchId: String

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	name: String

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	email: String

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	dob: String

	@ApiProperty()
	@IsString()
	@Column()
	church_number: String

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	location: String

	@ApiProperty()
	@ManyToOne(() => ChurchEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'mainChurchId' })
	main_church: Partial<ChurchEntity>;
}