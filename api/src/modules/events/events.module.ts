import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsEntity } from "./entities/events.entity";
import { EventsController } from "./controllers/events.controller";
import { EventsService } from "./services/events.service";


@Global()
@Module({
	imports: [TypeOrmModule.forFeature([EventsEntity])],
	controllers: [EventsController],
	providers: [
		EventsService
	],
	exports: [TypeOrmModule],
})
export class EventsModule { }