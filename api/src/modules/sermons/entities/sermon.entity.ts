import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('sermons')
export class SermonEntity extends BaseEntity {
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
	pastor: string;


	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 500 })
	link: string;

	@ApiProperty()
	@ManyToOne(() => ChurchEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'churchId' })
	church: Partial<ChurchEntity>;

}