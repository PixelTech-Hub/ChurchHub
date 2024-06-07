import { IsArray, IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CONFIG_DEFAULT_PAGE_SIZE } from '../../config/app.config';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { BaseEntity } from '../entities/base.entity';
import { In } from 'typeorm';

export class FindDto {
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({
    nullable: true,
    default: CONFIG_DEFAULT_PAGE_SIZE,
    description: 'To get all results, put NULL.',
  })
  limit?: number;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({ required: false, default: 0 })
  offset?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, nullable: true, default: 'createdAt' })
  sortField?: string;

  @IsString()
  @IsOptional()
  @IsIn(['asc', 'desc'])
  @ApiPropertyOptional({
    nullable: true,
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  sortOrder?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  id?: string;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  ids?: string[];

  get findOptionsWhere(): FindOptionsWhere<BaseEntity> {
    const where: FindOptionsWhere<BaseEntity> = {};
    if (this.id) where.id = this.id;
    if (this.ids) where.id = In(this.ids);
    return where;
  }
}