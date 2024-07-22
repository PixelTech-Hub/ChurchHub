import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinistryEntity } from './entities/ministry.entity';
import { MinistryController } from './controllers/ministry.controller';
import { ChurchMinistryService } from './services/ministry.service';
import { ChurchEntity } from 'src/modules/churches/entities/church.entity';
import { ChurchStaffEntity } from 'src/modules/church_staff/entities/church_staff.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      MinistryEntity,
      ChurchEntity,
      ChurchStaffEntity
    ])
  ],
  controllers: [
    MinistryController,
  ],
  providers: [
    ChurchMinistryService,
    ConfigService,
  ],
  exports: [
    TypeOrmModule,
    ChurchMinistryService
  ],
})
export class MinistriesModule { }