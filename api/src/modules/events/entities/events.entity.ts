import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('upcoming_events')
export class EventsEntity extends BaseEntity {
	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 100 })
	churchId: string;

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 100 })
	name: string;


	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 100 })
	category: string;

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 100 })
	event_date: string;


	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 500 })
	message: string;

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', nullable: true }) // Using 'text' type for large strings
	image: string;

	@ApiProperty()
	@ManyToOne(() => ChurchEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'churchId' })
	church: Partial<ChurchEntity>;

}

