import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'
import { AuthuserService } from '../../shared/authuser.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthuserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JwtSecret,
    })
  }

  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload)
    if (!user) {
      return done(
        new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
        false,
      )
    }

    return done(null, user, payload.iat)
  }
}
