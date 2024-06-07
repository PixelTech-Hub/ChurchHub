import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SermonEntity } from "./entities/sermon.entity";
import { SermonController } from "./controllers/sermons.controller";
import { SermonService } from "./services/sermon.service";


@Global()
@Module({
	imports: [TypeOrmModule.forFeature([SermonEntity])],
	controllers: [SermonController],
	providers: [
		SermonService
	],
	exports: [TypeOrmModule],
})
export class SermonModule { }