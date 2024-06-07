import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity'
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { CommentEntity } from 'src/modules/comments/entities/comment.entity';
import { MinistryEntity } from 'src/modules/ministries/entities/ministry.entity';
import { EntityEventTypeEnum } from 'src/common/enums/entity-event-type.enum';
import { ChurchEntity } from 'src/modules/churches/entities/church.entity';

@Entity('blogs')
export class InsightEntity extends BaseEntity {
	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 100 })
	churchId: string;

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 100 })
	name: string;

	@ApiProperty({
		enum: EntityEventTypeEnum,
		enumName: 'Event Type',
	})
	@IsDefined()
	@IsNotEmpty()
	@Column({ nullable: true })
	@IsEnum(EntityEventTypeEnum, { message: 'Please select the event type' })
	event_type: EntityEventTypeEnum;

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 100 })
	ministryId: string;


	@ApiProperty()
	@IsString()
	@MaxLength(1000)
	@Column({ type: 'text' })
	message: string;

	@ApiProperty()
	@IsString()
	@MaxLength(1000)
	@Column({ type: 'varchar', length: 100 })
	date: string;

	@ApiProperty({
		description: 'Comma-separated list of image URLs'
	})
	@IsString()
	@Column({ type: 'varchar', nullable: true }) // Using 'text' type for large strings
	image: string;

	@OneToMany(() => CommentEntity, comment => comment.event)
	comments: CommentEntity[];


	@ApiProperty()
	@ManyToOne(() => MinistryEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'ministryId' })
	ministry: Partial<MinistryEntity>;


	@ApiProperty()
	@ManyToOne(() => ChurchEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'churchId' })
	church: Partial<ChurchEntity>;
}