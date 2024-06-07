import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, IsString } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { InsightEntity } from "src/modules/blogs/entities/insights.entity";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('comments')
export class CommentEntity extends BaseEntity {
	@ApiProperty()
	@IsString()
	@Column()
	churchId: string;

	@ApiProperty()
	@IsString()
	@Column()
	eventId: string;

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 100 })
	name: string;

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 500 })
	message: string;

	@ApiProperty()
	@ManyToOne(() => InsightEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'eventId' })
	event: Partial<InsightEntity>;

	@ApiProperty()
	@ManyToOne(() => ChurchEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'churchId' })
	church: Partial<ChurchEntity>;


}