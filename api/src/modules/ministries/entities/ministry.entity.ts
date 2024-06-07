import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { InsightEntity } from "src/modules/blogs/entities/insights.entity";
import { ChurchMemberEntity } from "src/modules/church_members/entities/church_members.entity";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity('church_ministries')
export class MinistryEntity extends BaseEntity {


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
	leader: String


	@ApiProperty()
	@IsString()
	@Column({ nullable: true, type: 'text' })
	description: String

	@ManyToOne((type) => ChurchMemberEntity, (member) => member.ministries)
	church_members: ChurchMemberEntity[]

	// @OneToMany(() => InsightEntity, (insight) => insight.ministries)
	// insights: Partial<InsightEntity>[]


	@ApiProperty()
	@ManyToOne(() => ChurchEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'churchId' })
	church: Partial<ChurchEntity>;
}