import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChurchStaffEntity } from './entities/church_staff.entity';
import { ChurchStaffController } from './controllers/staff.controller';
import { ChurchStaffService } from './services/church_staff.service';

@Module({
	imports: [TypeOrmModule.forFeature([ChurchStaffEntity])],
	controllers: [ChurchStaffController],
	providers: [ChurchStaffService,],
	exports: [ChurchStaffService], // 
})
export class ChurchStaffModule { }
