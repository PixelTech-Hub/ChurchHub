import { PartialType } from "@nestjs/swagger";
import { CreateChurchStaffDto } from "./create-churchstaff.dto";

export class UpdateChurchStaffDto extends PartialType(CreateChurchStaffDto) { }