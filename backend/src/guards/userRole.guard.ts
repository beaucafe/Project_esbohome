import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (user.role === 'admin') {
      return true
    }

    throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED)
  }
}
