import { EntityChurchAdminRoleEnum } from 'src/modules/admins/enums/admin.enum';

export class JwtTokenPayloadModel {
	sub: string; // Id of the user or the admin
	entityName: EntityChurchAdminRoleEnum;
	 // super-admin | admin
}