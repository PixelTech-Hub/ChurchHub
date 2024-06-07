import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountEntity } from "./entities/account.entity";
import { AccountService } from "./services/account.service";
import { AccountController } from "./controllers/account.controller";


@Global()
@Module({
	imports: [TypeOrmModule.forFeature([AccountEntity])],
	controllers: [AccountController],
	providers: [
		AccountService
	],
	exports: [TypeOrmModule, AccountService],
})
export class AccountModule { }