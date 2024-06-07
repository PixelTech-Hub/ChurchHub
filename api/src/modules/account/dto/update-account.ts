import { PartialType } from "@nestjs/swagger";
import { CreateAccountDto } from "./create-account";

export class UpdateAccountDto extends PartialType(CreateAccountDto) { }