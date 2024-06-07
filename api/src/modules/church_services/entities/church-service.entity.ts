import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('church_services')
export class ChurchServiceEntity extends BaseEntity {

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	churchId: String

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	name: String

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	start_time: String

	@ApiProperty()
	@IsString()
	@Column()
	end_time: String

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	language: String

	@ApiProperty()
	@ManyToOne(() => ChurchEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'churchId' })
	church: Partial<ChurchEntity>;
}