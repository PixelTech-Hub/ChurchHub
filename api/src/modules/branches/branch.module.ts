import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchEntity } from './entities/branch.entity';
import { BranchController } from './controllers/branch.controller';
import { BranchService } from './services/branch.service';

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([BranchEntity])],
	controllers: [
		BranchController,        
	],
	providers: [
		BranchService,
		ConfigService,
	],
	exports: [
		TypeOrmModule,
		BranchService
	],
})
export class BranchModule { }