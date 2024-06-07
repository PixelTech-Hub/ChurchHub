import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { EntityGenderEnum } from "src/common/enums/entity-gender.enum";
import { EntityTransactionTypeEnum } from "src/common/enums/entity-transaction-type.enum";
import { ChurchStaffEntity } from "src/modules/church_staff/entities/church_staff.entity";
import { ChurchEntity } from "src/modules/churches/entities/church.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
	@ApiProperty()
	@IsString()
	@Column()
	churchId: string;

	@ApiProperty()
	@IsString()
	@Column()
	name: string;

	@ApiProperty()
	@IsString()
	@Column({ type: 'text' })
	reason_for: string;

	@ApiProperty()
	@IsString()
	@Column({ nullable: true })
	staffId: string;

	@ApiProperty()
	@IsString()
	@Column()
	amount: string;

	@ApiProperty()
	@IsString()
	@Column()
	date: string;

	@ApiProperty({
		enum: EntityTransactionTypeEnum,
		enumName: 'Transacton Type',
	})
	@IsDefined()
	@IsNotEmpty()
	@Column({ nullable: true })
	@IsEnum(EntityTransactionTypeEnum, { message: 'Please select a transaction type' })
	transaction_type: EntityTransactionTypeEnum;



	// @ApiProperty()
	// @ManyToOne(() => ChurchStaffEntity, (staff) => staff.transactions, {
	// 	onUpdate: 'CASCADE',
	// 	onDelete: 'CASCADE',
	// })
	// @JoinColumn({ name: 'staffId' })
	// staff: Partial<ChurchStaffEntity>;

	@ApiProperty()
	@ManyToOne(() => ChurchEntity, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'churchId' })
	church: Partial<ChurchEntity>;
}