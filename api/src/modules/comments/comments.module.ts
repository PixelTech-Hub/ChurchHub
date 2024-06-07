import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentEntity } from "./entities/comment.entity";
import { ContactService } from "./services/comment.service";
import { CommentController } from "./controllers/comment.controller";


@Global()
@Module({
	imports: [TypeOrmModule.forFeature([CommentEntity])],
	controllers: [CommentController],
	providers: [
		ContactService
	],
	exports: [TypeOrmModule],
})
export class CommentModule { }