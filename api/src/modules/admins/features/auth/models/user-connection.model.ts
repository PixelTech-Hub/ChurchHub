import { ApiProperty } from '@nestjs/swagger';
import { AdminEntity } from 'src/modules/admins/entities/admin.entity';

export class UserConnection {
  @ApiProperty({ type: AdminEntity })
  data: AdminEntity;

  @ApiProperty({ required: false })
  accessToken?: string;

  @ApiProperty({ required: false })
  requiresOtp?: boolean;
}
