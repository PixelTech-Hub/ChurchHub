import { PartialType } from '@nestjs/swagger';
import { CreateSermonDto } from './create-sermon';

export class UpdateSermonDto extends PartialType(CreateSermonDto) {}
