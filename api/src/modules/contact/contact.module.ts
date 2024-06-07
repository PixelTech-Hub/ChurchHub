import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactEntity } from "./entities/contact.entity";
import { ContactService } from "./services/contact.service";
import { ContactController } from "./controllers/contact.controller";


@Global()
@Module({
	imports: [TypeOrmModule.forFeature([ContactEntity])],
	controllers: [ContactController],
	providers: [
		ContactService
	],
	exports: [TypeOrmModule],
})
export class ContactModule { }