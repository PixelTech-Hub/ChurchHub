import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, IsString } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('subscribers')
export class SubscriberEntity extends BaseEntity {
	@ApiProperty()
	@Column({ type: 'varchar'})
	churchId: string;

	@ApiProperty()
	@IsEmail()
	@Column({ type: 'varchar', length: 150 })
	email: string;

	@ApiProperty()
	@ManyToOne(() => ChurchEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'churchId' })
	church: Partial<ChurchEntity>;
}