import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, IsString } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('contact')
export class ContactEntity extends BaseEntity {
	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 100 })
	churchId: string;

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 100 })
	name: string;


	@ApiProperty()
	@IsEmail()
	@Column({ type: 'varchar', length: 150 })
	email: string;

	@ApiProperty()
	@IsPhoneNumber()
	@Column({ type: 'varchar', length: 150 })
	telephone: string;

	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 100 })
	subject: string;


	@ApiProperty()
	@IsString()
	@Column({ type: 'varchar', length: 500 })
	message: string;

	@ApiProperty()
	@ManyToOne(() => ChurchEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'churchId' })
	church: Partial<ChurchEntity>;
}