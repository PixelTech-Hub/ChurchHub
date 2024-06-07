import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Exclude } from 'class-transformer';

export class BaseUserEntity extends BaseEntity {

	@ApiProperty()
	@Column({ type: 'varchar', length: 100, nullable: true })
	name: string;

	@ApiProperty()
	@Column({ type: 'varchar', length: 100 })
	email: string;

	@Exclude() // Using the class-transformer to make sure the password is excluded from results that are returned to the user
	@Column({ type: 'varchar', length: 255, nullable: true })
	password: string;

	@ApiProperty({ required: false })
	@Column({ nullable: true })
	lastSeenAt: Date;

	@ApiProperty()
	@Column({ type: 'varchar', length: 255, nullable: true })
	phone_number: string

	@ApiProperty()
	@Column({ type: 'varchar', length: 255, nullable: true })
	address: string

	@ApiProperty()
	@Column({ type: 'varchar', length: 255, nullable: true })
	city: string

	@ApiProperty()
	@Column({ type: 'varchar', length: 255, nullable: true })
	photo: string

	@ApiProperty()
	@Column({ type: 'varchar', length: 255, nullable: true })
	profession: string

	@ApiProperty()
	@Column({ type: 'varchar', length: 255, nullable: true })
	about: string
}