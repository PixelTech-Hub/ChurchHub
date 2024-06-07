import { PartialType } from '@nestjs/swagger';
import { CreateChurchServiceDto } from './create-church-service.dto';

export class UpdateChurchServiceDto extends PartialType(CreateChurchServiceDto) { }