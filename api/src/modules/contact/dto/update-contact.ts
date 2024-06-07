import { PartialType } from "@nestjs/swagger";
import { CreateContactDto } from "./create-contact";

export class UpdateContactDto extends PartialType(CreateContactDto) {}