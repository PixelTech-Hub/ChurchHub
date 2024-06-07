import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtTokenPayloadModel } from '../../../../common/models/jwt-token-payload.model';
import { CONFIG_JWT_SECRET } from 'src/config/app.config';

@Injectable()
export class ChurchAdminsJwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true, // We ignore the expiration date because the main-dashboard can spend a lot of time without connecting to internet and still synchronize
			secretOrKey: CONFIG_JWT_SECRET,
		});
	}

	validate(payload: JwtTokenPayloadModel): JwtTokenPayloadModel {
		return payload;
	}
}