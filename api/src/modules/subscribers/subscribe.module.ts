import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscriberEntity } from "./entities/subscriber.entity";
import { SubscribeController } from "./controllers/subscriber.controller";
import { SubscribeService } from "./services/subscribers.service";


@Global()
@Module({
	imports: [TypeOrmModule.forFeature([SubscriberEntity])],
	controllers: [SubscribeController],
	providers: [
		SubscribeService
	],
	exports: [TypeOrmModule],
})
export class SubscribeModule { }