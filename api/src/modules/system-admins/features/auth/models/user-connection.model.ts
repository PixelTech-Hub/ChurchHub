import { ApiProperty } from '@nestjs/swagger';
import { AdminEntity } from 'src/modules/admins/entities/admin.entity';
import { SystemAdminEntity } from 'src/modules/system-admins/entities/system_admin.entity';

export class UserConnection {
  @ApiProperty({ type: SystemAdminEntity })
  data: SystemAdminEntity;

  @ApiProperty()
  accessToken: string;
}