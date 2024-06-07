import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChurchMemberEntity } from './entities/church_members.entity';
import { ChurchMemberController } from './controllers/church_members.controller';
import { ChurchMemberService } from './services/church_member.service';

@Module({
	imports: [TypeOrmModule.forFeature([ChurchMemberEntity])],
	controllers: [ChurchMemberController],
	providers: [ChurchMemberService,],
	exports: [ChurchMemberService], // 
})
export class ChurchMembersModule { }
