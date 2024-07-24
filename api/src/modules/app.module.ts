import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { AdminModule } from './admins/admin.module';
import { AdminEntity } from './admins/entities/admin.entity';
import { AuthModule } from './admins/features/auth/admin.auth.module';
import { ChurchModule } from './churches/church.module';
import { ChurchEntity } from './churches/entities/church.entity';
import { BranchModule } from './branches/branch.module';
import { BranchEntity } from './branches/entities/branch.entity';
import { ChurchServiceModule } from './church_services/church-services.module';
import { ChurchServiceEntity } from './church_services/entities/church-service.entity';
import { MinistriesModule } from './ministries/ministry.module';
import { MinistryEntity } from './ministries/entities/ministry.entity';
import { ChurchMembersModule } from './church_members/church_members.module';
import { ChurchMemberEntity } from './church_members/entities/church_members.entity';
import { ContactModule } from './contact/contact.module';
import { ContactEntity } from './contact/entities/contact.entity';
import { CommentModule } from './comments/comments.module';
import { CommentEntity } from './comments/entities/comment.entity';
import { InsightsModules } from './blogs/insights.module';
import { InsightEntity } from './blogs/entities/insights.entity';
import { SermonModule } from './sermons/sermons.module';
import { SermonEntity } from './sermons/entities/sermon.entity';
import { SubscribeModule } from './subscribers/subscribe.module';
import { SubscriberEntity } from './subscribers/entities/subscriber.entity';
import { EventsModule } from './events/events.module';
import { EventsEntity } from './events/entities/events.entity';
import { AccountModule } from './account/account.module';
import { AccountEntity } from './account/entities/account.entity';
import { ChurchStaffModule } from './church_staff/church_staff.module';
import { ChurchStaffEntity } from './church_staff/entities/church_staff.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { TransactionEntity } from './transactions/entities/transactions.entity';
import { ActivityModule } from './activities/activities.module';
import { ActivityEntity } from './activities/entities/activity.entity';
import { SystemAdminModule } from './system-admins/system_admin.module';
import { SystemAdminEntity } from './system-admins/entities/system_admin.entity';
import { SystemAuthModule } from './system-admins/features/auth/system_admin.auth.module';


@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<'postgres' | 'postgres'>('DB_TYPE', 'postgres'),
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          SystemAdminEntity,
          AdminEntity,
          ChurchEntity,
          BranchEntity,
          ChurchServiceEntity,
          MinistryEntity,
          ChurchMemberEntity,
          ContactEntity,
          CommentEntity,
          InsightEntity,
          SermonEntity,
          SubscriberEntity,
          EventsEntity,
          AccountEntity,
          ChurchStaffEntity,
          TransactionEntity,
          // ActivityEntity
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    } as TypeOrmModuleAsyncOptions), // Add TypeOrmModuleAsyncOptions
    I18nModule.forRootAsync({
      inject: [ConfigService],
      resolvers: [AcceptLanguageResolver],
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: path.join(__dirname, '/../i18n/'),
          watch: configService.get('NODE_ENV') === 'development',
        },
        logging: configService.get('NODE_ENV') === 'development', // REVIEW: Is this necessary?
      }),
    }),
    TransactionsModule,
    ChurchStaffModule,
    EventsModule,
    SubscribeModule,
    SermonModule,
    InsightsModules,
    CommentModule,
    ContactModule,
    ChurchMembersModule,
    MinistriesModule,
    ChurchServiceModule,
    // ActivityModule,
    BranchModule,
    ChurchModule,
    AccountModule,
    AdminModule,
    SystemAuthModule,
    SystemAdminModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
