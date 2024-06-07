import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('activities')
export class ActivityEntity extends BaseEntity {

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	churchId: String

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	churchBranchId: String

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	name: String

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	description: String



	@ApiProperty()
	@ManyToOne(() => ChurchEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'churchId' })
	main_church: Partial<ChurchEntity>;

	@ApiProperty()
	@ManyToOne(() => ActivityEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'churchBranchId' })
	church_branch: Partial<ActivityEntity>;
}