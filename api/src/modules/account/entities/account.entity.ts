import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, IsString } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { InsightEntity } from "src/modules/blogs/entities/insights.entity";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity('accounts')
export class AccountEntity extends BaseEntity {
	@ApiProperty()
	@IsString()
	@Column()
	churchId: string;

	@ApiProperty()
	@IsString()
	@Column()
	balance: string;


	@ApiProperty()
	@OneToOne(() => ChurchEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'churchId' })
	church: Partial<ChurchEntity>;


}