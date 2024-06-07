import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ExceptionEnum } from 'src/common/enums/exception.enum';
import { JwtTokenPayloadModel } from 'src/common/models/jwt-token-payload.model';
import { CONFIG_JWT_SECRET } from 'src/config/app.config';
import { EntityChurchAdminRoleEnum } from 'src/modules/admins/enums/admin.enum';
import { AdminService } from 'src/modules/admins/services/admin.service';

@Injectable()
export class ChurchAdminAuthGuard extends AuthGuard('jwt') {
	constructor(
		private readonly usersService: AdminService,
	) {
		super();
	}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const ans = await super.canActivate(context);
		if (!ans) throw new UnauthorizedException(ExceptionEnum.unauthorized);
		const [req] = context.getArgs();
		const payload = req.user;

		const allowedRoles = [
			EntityChurchAdminRoleEnum.superadmin,
			EntityChurchAdminRoleEnum.admin,
			// EntityChurchAdminRoleEnum.editor,
		];

		if (!allowedRoles.includes(payload.entityName)) {
			throw new UnauthorizedException(ExceptionEnum.unauthorized);
		}
		// --
		// if (payload.entityName !== EntityChurchAdminRoleEnum.superadmin)
		// 	throw new UnauthorizedException(ExceptionEnum.unauthorized);

		// --
		const admin = await this.usersService.findOneByField(
			payload.sub,
			'id',
		);
		if (admin) {
			await this.usersService.updateLastSeenAt(admin);
		}
		delete req.user;
		req.organizationAdmin = admin;
		return true;
	}
}