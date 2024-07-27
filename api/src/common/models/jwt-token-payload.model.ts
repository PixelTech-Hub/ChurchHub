import { EntityChurchAdminRoleEnum } from 'src/modules/admins/enums/admin.enum';

export class JwtTokenPayloadModel {
	sub: string;
	entityName: EntityChurchAdminRoleEnum;
}