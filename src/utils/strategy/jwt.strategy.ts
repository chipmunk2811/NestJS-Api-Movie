import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get("SECRET_KEY"),
        });
    }

    // khi user FE đã xác thực thành công
    async validate(tokenDecode: any) {

        // Phân quyền ở đây, đùng cho admin hay người dùng

        return tokenDecode;
    }
}
