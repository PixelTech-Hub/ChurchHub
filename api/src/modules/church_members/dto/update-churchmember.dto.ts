import { PartialType } from "@nestjs/swagger";
import { CreateChurchMemberDto } from "./create-churchmember.dto";

export class UpdateChurchMemberDto extends PartialType(CreateChurchMemberDto) { }