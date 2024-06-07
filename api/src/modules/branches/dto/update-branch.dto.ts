import { PartialType } from '@nestjs/swagger';
import { CreateBranchDto } from './create-branch.dto';

export class UpdateChurchDto extends PartialType(CreateBranchDto) { }